// Puns about "only a card" — mix of German and English, card-themed
// Shown in the scrolling ticker beneath the mini cards.
const PUNS = [
  'Du hast gesagt, du wünscht dir „nur eine Karte." Wir haben das als Herausforderung verstanden.',
  'Diese Karte ist: ✔ Recycelbar ✔ Nachhaltig ✔ Komplett ausreichend laut dir',
  'Du hast uns durch DSE gecarried. Jetzt wollten wir dir mal zeigen, dass wir auch was deployen können.',
  'Technisch gesehen sind das drei Karten: Geburtstagskarte, NFC-Karte, Website. Card-ception. Du hast bekommen, worum du gebeten hast — mal drei.',
  'Cloud Native, DSE, Exkursion-Logistics — du managed alles außer deine eigenen Geburtstagserwartungen. Respekt.',
  'Wer zahlt die nächste Runde? Keine Ahnung. Wir haben den Überblick verloren. Aber diese Karte hier — die ist definitiv auf uns.',
  'Happy 30th! Du bist jetzt offiziell legacy. Aber keine Sorge — wir deployen noch regelmäßig Updates auf der Exkursion.',
  'In der DSE-Vorlesung: Tom carried. In Cloud Native: Tom carried. Bei der Exkursion: Tom schlägt vor zu zahlen. Muster erkannt.',
  'Zum 30. Geburtstag bekommst du genau das, was du bestellt hast. Keine hidden dependencies. Keine breaking changes. Nur eine Karte.',
  'Nächste Exkursion zahlen wir — versprochen. Diese Aussage ist nicht rechtsverbindlich und wird wahrscheinlich wieder diskutiert.',
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
