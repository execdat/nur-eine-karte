# nur eine karte

A birthday gift disguised as "only a card" — because that's what was requested.

An NFC tag links to [nur-eine-karte.org](https://nur-eine-karte.org), where the recipient discovers an interactive card full of card puns.

## Flow

1. **Envelope** — tap to open it
2. **Card front** — reveals the premise ("you asked for only a card, here it is")
3. **Card back** — tap the card to flip; cycle through puns with the button
4. **Final screen** — birthday message; tap to loop back

## Structure

```
index.html   — markup & page structure
style.css    — dark purple/gold theme, envelope & card animations
script.js    — puns, interactions, state machine
CNAME        — custom domain: nur-eine-karte.org
```

## Hosting

GitHub Pages, served from the `main` branch root.
The `CNAME` file points to `nur-eine-karte.org`.
