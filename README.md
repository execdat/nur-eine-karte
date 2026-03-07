# nur eine karte

A birthday gift disguised as "only a card" — because that's what was requested.

An NFC tag links to [nur-eine-karte.org](https://nur-eine-karte.org), where the recipient discovers three interactive playing cards full of riddles, plus a scrolling pun ticker.

## Flow

1. **Splash** — congratulation screen shown on load; tap to proceed
2. **Envelope** — tap to open it
3. **3 mini playing cards** — each has a QR code on the front; tap to flip and reveal a riddle on the back
4. **Pun ticker** — card puns scroll continuously beneath the cards

## Customisation

- **Riddles**: edit the `<p class="riddle-text">` content in `index.html` (look for `<!-- Riddle N — edit text here -->` comments)
- **QR codes**: replace the `<div class="qr-placeholder">` with an `<img>` tag once you have the codes
- **Puns**: edit the `PUNS` array in `script.js`

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
