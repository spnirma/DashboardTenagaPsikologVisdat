// Greeting audio saat pertama klik
const greetingText = 'Hei, selamat datang di dataset Satu Sehat, data persebaran psikolog Indonesia. Silakan mengakses data statistik berikut. Mohon gunakan data dengan bijak dan cantumkan sumber.';

document.addEventListener('click', function playGreeting() {
  const speech = new SpeechSynthesisUtterance(greetingText);
  speech.lang   = 'id-ID';
  speech.volume = 0.8;
  speech.rate   = 0.88;
  speech.pitch  = 1.05;

  // Pilih suara bahasa Indonesia jika tersedia
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(v => v.lang === 'id-ID' || v.lang.startsWith('id'));
  if (idVoice) speech.voice = idVoice;

  window.speechSynthesis.speak(speech);
  document.removeEventListener('click', playGreeting);
}, { once: true });

// Pastikan voices sudah load sebelum dipakai
window.speechSynthesis.onvoiceschanged = () => {};
