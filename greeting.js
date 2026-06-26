// Tunggu voices load dulu
function playGreeting() {
  const synth = window.speechSynthesis;
  const text = 'Hei, selamat datang di dataset Satu Sehat, data persebaran psikolog Indonesia. Mohon gunakan data dengan bijak dan cantumkan sumber.';

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang   = 'id-ID';
  utter.volume = 1;
  utter.rate   = 0.85;
  utter.pitch  = 1;

  const voices = synth.getVoices();
  console.log('Voices tersedia:', voices.map(v => v.lang + ' — ' + v.name));

  const idVoice = voices.find(v => v.lang.includes('id'));
  if (idVoice) {
    utter.voice = idVoice;
    console.log('Pakai suara:', idVoice.name);
  } else {
    console.log('Suara id-ID tidak ditemukan, pakai default');
  }

  synth.cancel(); // reset dulu
  synth.speak(utter);
}

// Klik pertama trigger greeting
document.addEventListener('click', function handler() {
  setTimeout(playGreeting, 300);
  document.removeEventListener('click', handler);
}, { once: true });
