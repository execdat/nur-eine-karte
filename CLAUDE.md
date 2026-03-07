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
1. **Splash** — congratulation screen shown on load; tap to proceed (fades out over 400 ms)
2. **Envelope** — tap to open (shake + CSS flap-fold animation)
3. **3 mini playing cards + ticker** — three independently flippable cards (QR front / riddle back); pun ticker scrolls below via CSS animation

No frameworks, no state library.

**Ticker**: `PUNS` strings are joined with ` ♦ ` and duplicated into two `<span>` elements inside `.ticker-track`. A CSS `@keyframes tickerScroll` animates `translateX(0 → -50%)` for a seamless infinite loop.

**Mini cards**: each `.mini-card` wraps `.mini-card-inner` (3D flip container) with `.mini-card-front` (QR placeholder) and `.mini-card-back` (riddle). `perspective` is on the outer `.mini-card`; `transform-style: preserve-3d` and `backface-visibility: hidden` on inner faces.

**Live reload** (`serve.py`): file watcher thread → `SimpleQueue` per connected SSE client → browser reloads only when version changes after baseline is established (avoids reload loop on fresh connect).

## Language / tone

Puns are a mix of German and English. UI labels are in German. Keep new puns in the same bilingual, playful style.
