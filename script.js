// Puns about "only a card" — mix of German and English, card-themed
// These are shown in the scrolling ticker at the bottom.
const PUNS = [
  '"Nur eine Karte" hast du gesagt. Hier ist sie. NFC-Karte. Zählt.',
  'Wir haben die Regeln befolgt. Du hast nach einer Karte gefragt. Wild Card aktiviert. 🃏',
  '„Card"-lich Glückwunsch zum Geburtstag! Wir nehmen unsere Versprechen sehr buchstäblich.',
  'Was ist besser als ein Geschenk? Eine Karte mit einer Entschuldigung, warum kein Geschenk dabei ist.',
  'Du hast gesagt: „Kein Stress, nur eine Karte." Wir haben das als Herausforderung verstanden. Challenge accepted. ♠',
  'Diese Karte ist: ✔ Recycelbar ✔ Nachhaltig ✔ Komplett ausreichend laut dir',
  'Andere Leute kriegen Geschenke. Du kriegst genau das, worum du gebeten hast. Respekt. ♥',
  'Wir hätten dir was gekauft, aber du meintest es ernst. Also: Ta-daa. ✨',
  '„In Karten wir vertrauen." —Niemand, aber wir fanden es card-passend. ♣',
  'Du wolltest nur eine Karte. Wir gaben dir eine Karte mit unendlich vielen Puns drin. Gerne. ♦',
];

const envelopeWrapper = document.getElementById('envelope-wrapper');
const cardWrapper     = document.getElementById('card-wrapper');
const finalMessage    = document.getElementById('final-message');
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

// --- Build ticker from PUNS (shuffled, individual elements for spacing) ---
function buildTicker() {
  const shuffled = shuffle(PUNS);
  // Two identical copies for seamless loop; translateX(-50%) = one copy width
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

// --- Envelope: tap to open ---
envelopeWrapper.addEventListener('click', () => {
  envelopeWrapper.classList.add('opening');
  document.getElementById('envelope').classList.add('open');
  setTimeout(() => {
    envelopeWrapper.classList.add('hidden');
    cardWrapper.classList.remove('hidden');
  }, 700);
});

// --- Mini cards: individual flip ---
const miniCards = document.querySelectorAll('.mini-card');
miniCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// --- Initial splash: tap to proceed to envelope ---
function dismissSplash() {
  finalMessage.classList.add('fading-out');
  setTimeout(() => {
    finalMessage.classList.add('hidden');
    finalMessage.classList.remove('fading-out');
    envelopeWrapper.classList.remove('hidden');
  }, 400);
}

finalMessage.addEventListener('click', dismissSplash, { once: true });


buildTicker();
