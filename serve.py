#!/usr/bin/env python3
"""
Lightweight dev server with live reload.
Usage: python3 serve.py [port]

Serves the current directory on localhost:<port> (default 3000).
Injects a tiny SSE snippet into HTML responses so the browser
automatically reloads when any file changes.
"""

import hashlib
import http.server
import os
import sys
import threading
import time
from pathlib import Path

PORT   = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
WATCH  = Path(__file__).parent
EXTS   = {".html", ".css", ".js", ".svg", ".ico", ".json"}

# --- File-change detection via mtimes ---

def snapshot():
    mtimes = {}
    for p in WATCH.rglob("*"):
        if p.suffix in EXTS and ".git" not in p.parts:
            try:
                mtimes[p] = p.stat().st_mtime
            except OSError:
                pass
    return mtimes

_state   = {"snap": snapshot(), "version": 0}
_clients = []
_lock    = threading.Lock()

def watcher():
    while True:
        time.sleep(0.4)
        new_snap = snapshot()
        if new_snap != _state["snap"]:
            _state["snap"]    = new_snap
            _state["version"] += 1
            version = _state["version"]
            print(f"  [reload] file changed — version {version}")
            with _lock:
                for q in list(_clients):
                    try:
                        q.put(version)
                    except Exception:
                        pass

# SSE snippet injected before </body>
SSE_SCRIPT = b"""
<script>
(function(){
  var base = null;
  var es = new EventSource('/__reload');
  es.onmessage = function(e){
    if(e.data === '0') return;        // heartbeat, ignore
    if(base === null) { base = e.data; return; }  // first msg: set baseline
    if(e.data !== base) location.reload();         // changed: reload
  };
  es.onerror = function(){
    setTimeout(function(){ location.reload(); }, 1000);
  };
})();
</script>
"""

# Simple queue without importing queue module
class SimpleQueue:
    def __init__(self):
        self._items = []
        self._event = threading.Event()

    def put(self, item):
        self._items.append(item)
        self._event.set()

    def get(self, timeout=None):
        self._event.wait(timeout)
        self._event.clear()
        if self._items:
            return self._items.pop(0)
        return None


class Handler(http.server.SimpleHTTPRequestHandler):

    def log_message(self, fmt, *args):
        print(f"  {self.address_string()} {fmt % args}")

    def do_GET(self):
        # SSE endpoint
        if self.path == "/__reload":
            self._sse()
            return

        # Serve files normally, injecting the SSE script into HTML
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            path = os.path.join(path, "index.html")

        try:
            with open(path, "rb") as f:
                data = f.read()
        except (FileNotFoundError, IsADirectoryError):
            self.send_error(404)
            return

        ctype = self._guess_type(path)
        if "html" in ctype:
            data = data.replace(b"</body>", SSE_SCRIPT + b"</body>", 1)
            if b"</body>" not in data:
                data += SSE_SCRIPT

        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def _guess_type(self, path):
        ext = os.path.splitext(path)[1].lower()
        return {
            ".html": "text/html; charset=utf-8",
            ".css":  "text/css",
            ".js":   "application/javascript",
            ".json": "application/json",
            ".svg":  "image/svg+xml",
            ".ico":  "image/x-icon",
            ".png":  "image/png",
            ".jpg":  "image/jpeg",
            ".jpeg": "image/jpeg",
            ".webp": "image/webp",
        }.get(ext, "application/octet-stream")

    def _sse(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/event-stream")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Connection", "keep-alive")
        self.end_headers()

        q = SimpleQueue()
        with _lock:
            _clients.append(q)

        # Send current version immediately so client syncs
        try:
            self._send_event(str(_state["version"]))
            while True:
                version = q.get(timeout=25)
                if version is None:
                    # heartbeat
                    self._send_event("0")
                else:
                    self._send_event(str(version))
        except (BrokenPipeError, ConnectionResetError):
            pass
        finally:
            with _lock:
                _clients.remove(q)

    def _send_event(self, data: str):
        msg = f"data: {data}\n\n".encode()
        self.wfile.write(msg)
        self.wfile.flush()


if __name__ == "__main__":
    threading.Thread(target=watcher, daemon=True).start()

    http.server.ThreadingHTTPServer.allow_reuse_address = True
    server = http.server.ThreadingHTTPServer(("", PORT), Handler)
    print(f"  Serving at http://localhost:{PORT}")
    print(f"  Watching {WATCH}")
    print(f"  Ctrl+C to stop\n")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Stopped.")
