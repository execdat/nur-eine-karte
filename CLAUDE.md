# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dev server

```sh
python3 serve.py        # serves on http://localhost:3000
python3 serve.py 8080   # custom port
```

`serve.py` is a zero-dependency Python 3 stdlib server with live reload via SSE. It polls for file changes every 400 ms and injects a small `<script>` into HTML responses. No build step, no install.

## Hosting

GitHub Pages, `main` branch root → `nur-eine-karte.org` (configured via `CNAME`). Deploy by pushing to `main` — no CI/CD needed.

## Architecture

Single-page static site, no framework, no bundler.

**UX state machine** (`script.js`):
1. **Envelope** — tap to open (shake + CSS flap-fold animation)
2. **Card front** — playing-card layout; tap to flip
3. **Card back** — cycles through the `PUNS` array one at a time via "Next" button
4. **Final message** — shown after last pun; tap anywhere to loop back to step 2

State is held in plain JS variables (`currentPun`, `cardFlipped`). No frameworks, no state library.

**Live reload** (`serve.py`): file watcher thread → `SimpleQueue` per connected SSE client → browser reloads only when version changes after baseline is established (avoids reload loop on fresh connect).

## Language / tone

Puns are a mix of German and English. UI labels are in German. Keep new puns in the same bilingual, playful style.
