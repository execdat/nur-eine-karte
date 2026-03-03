// Puns about "only a card" — mix of German and English, card-themed
const PUNS = [
  {
    text: '„Nur eine Karte" hast du gesagt.\nHier ist sie.\n<em>NFC-Karte. Zählt.</em>',
  },
  {
    text: 'Wir haben die Regeln befolgt.\nDu hast nach einer Karte gefragt.\n<em>Wild Card aktiviert. 🃏</em>',
  },
  {
    text: '„Card"-lich Glückwunsch zum Geburtstag!\nWir nehmen unsere Versprechen\n<em>sehr buchstäblich.</em>',
  },
  {
    text: 'Was ist besser als ein Geschenk?\n<em>Eine Karte mit einer Entschuldigung,\nwarum kein Geschenk dabei ist.</em>',
  },
  {
    text: 'Du hast gesagt: „Kein Stress, nur eine Karte."\nWir haben das als Herausforderung verstanden.\n<em>Challenge accepted. ♠</em>',
  },
  {
    text: 'Diese Karte ist:\n✔ Recycelbar\n✔ Nachhaltig\n<em>✔ Komplett ausreichend laut dir</em>',
  },
  {
    text: 'Andere Leute kriegen Geschenke.\nDu kriegst genau das,\n<em>worum du gebeten hast. Respekt.</em> ♥',
  },
  {
    text: 'Wir hätten dir was gekauft,\naber du meintest es ernst.\nAlso:\n<em>Ta-daa. ✨</em>',
  },
  {
    text: '„In Karten wir vertrauen."\n—Niemand, aber wir fanden es\n<em>card-passend.</em> ♣',
  },
  {
    text: 'Du wolltest nur eine Karte.\nWir gaben dir eine Karte\n<em>mit unendlich vielen Puns drin.</em>\nGerne. ♦',
  },
];

let currentPun = 0;
let cardFlipped = false;

const envelopeWrapper = document.getElementById('envelope-wrapper');
const cardWrapper     = document.getElementById('card-wrapper');
const card            = document.getElementById('card');
const punContainer    = document.getElementById('puns-container');
const nextBtn         = document.getElementById('next-btn');
const finalMessage    = document.getElementById('final-message');
const scene           = document.getElementById('scene');

// --- Render a pun ---
function renderPun(index) {
  const pun = PUNS[index];
  punContainer.innerHTML = `
    <div>
      <p class="pun-number">${index + 1} / ${PUNS.length}</p>
      <p class="pun-text">${pun.text.replace(/\n/g, '<br/>')}</p>
    </div>
  `;
}

// --- Envelope: tap to open ---
envelopeWrapper.addEventListener('click', () => {
  envelopeWrapper.classList.add('opening');

  const envelope = document.getElementById('envelope');
  envelope.classList.add('open');

  // After animation, switch to card view
  setTimeout(() => {
    envelopeWrapper.classList.add('hidden');
    cardWrapper.classList.remove('hidden');
    renderPun(0);
  }, 700);
});

// --- Card: tap to flip ---
card.addEventListener('click', (e) => {
  // Don't flip when clicking the next button
  if (e.target === nextBtn) return;

  cardFlipped = !cardFlipped;
  card.classList.toggle('flipped', cardFlipped);
});

// --- Next pun button ---
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentPun++;

  if (currentPun >= PUNS.length) {
    // Show final message
    cardWrapper.classList.add('hidden');
    finalMessage.classList.remove('hidden');
  } else {
    renderPun(currentPun);
  }
});

// --- Final message: tap anywhere to loop back ---
scene.addEventListener('click', (e) => {
  if (!finalMessage.classList.contains('hidden')) {
    // Reset everything
    currentPun = 0;
    cardFlipped = false;
    card.classList.remove('flipped');
    renderPun(0);
    finalMessage.classList.add('hidden');
    cardWrapper.classList.remove('hidden');
  }
});
