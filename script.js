// Puns about "only a card" — mix of German and English, card-themed
// Shown in the scrolling ticker beneath the mini cards.
const PUNS = [
  'Du hast gesagt, du wünscht dir „nur eine Karte." Wir haben das als Herausforderung verstanden.',
  'Diese Karte ist: ✔ Recycelbar ✔ Nachhaltig ✔ Komplett ausreichend laut dir',
];

const splash          = document.getElementById('splash');
const envelopeWrapper = document.getElementById('envelope-wrapper');
const cardWrapper     = document.getElementById('card-wrapper');
const tickerTrack     = document.getElementById('ticker-track');

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build ticker from PUNS (shuffled). Two identical copies for a seamless
// CSS loop: animating translateX(0 → -50%) scrolls exactly one copy width.
function buildTicker() {
  const shuffled = shuffle(PUNS);
  for (let copy = 0; copy < 2; copy++) {
    const set = document.createElement('span');
    set.className = 'ticker-set';
    shuffled.forEach(pun => {
      const el = document.createElement('span');
      el.className = 'ticker-pun';
      el.textContent = pun;
      set.appendChild(el);
    });
    tickerTrack.appendChild(set);
  }
}

// Step 1 → 2: tap splash to proceed to envelope
splash.addEventListener('click', () => {
  splash.classList.add('fading-out');
  setTimeout(() => {
    splash.classList.add('hidden');
    splash.classList.remove('fading-out');
    envelopeWrapper.classList.remove('hidden');
  }, 400);
}, { once: true });

// Step 2 → 3: tap envelope to open it, then reveal cards
envelopeWrapper.addEventListener('click', () => {
  envelopeWrapper.classList.add('opening');
  document.getElementById('envelope').classList.add('open');
  setTimeout(() => {
    envelopeWrapper.classList.add('hidden');
    cardWrapper.classList.remove('hidden');
  }, 700);
});

// Step 3: tap each mini card to flip it (QR front ↔ riddle back)
document.querySelectorAll('.mini-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

buildTicker();
