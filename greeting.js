// Tombol speaker
const btn = document.createElement('button');
btn.innerHTML = '🔊 Putar Sambutan';
btn.style.cssText = `
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  background: linear-gradient(135deg, #1a7a4a, #2ecc71);
  color: white;
  border: none;
  border-radius: 99px;
  padding: 10px 20px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(26,122,74,0.35);
  transition: transform 0.2s, opacity 0.2s;
`;
btn.onmouseenter = () => btn.style.transform = 'scale(1.05)';
btn.onmouseleave = () => btn.style.transform = 'scale(1)';
document.body.appendChild(btn);

function playGreeting() {
  const synth = window.speechSynthesis;
  const text = 'Hei, selamat datang di dataset Satu Sehat, data persebaran psikolog Indonesia. Mohon gunakan data dengan bijak dan cantumkan sumber.';

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang   = 'id-ID';
  utter.volume = 1;
  utter.rate   = 0.85;
  utter.pitch  = 1;

  const voices = synth.getVoices();
  const idVoice = voices.find(v => v.lang.includes('id'));
  if (idVoice) utter.voice = idVoice;

  btn.innerHTML = '🔊 Memutar...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  utter.onend = () => {
    btn.innerHTML = '🔊 Putar Lagi';
    btn.style.opacity = '1';
    btn.disabled = false;
  };

  synth.cancel();
  synth.speak(utter);
}

btn.addEventListener('click', playGreeting);// Tombol speaker
const btn = document.createElement('button');
btn.innerHTML = '🔊 Putar Sambutan';
btn.style.cssText = `
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  background: linear-gradient(135deg, #1a7a4a, #2ecc71);
  color: white;
  border: none;
  border-radius: 99px;
  padding: 10px 20px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(26,122,74,0.35);
  transition: transform 0.2s, opacity 0.2s;
`;
btn.onmouseenter = () => btn.style.transform = 'scale(1.05)';
btn.onmouseleave = () => btn.style.transform = 'scale(1)';
document.body.appendChild(btn);

function playGreeting() {
  const synth = window.speechSynthesis;
  const text = 'Hei, selamat datang di dataset Satu Sehat, data persebaran psikolog Indonesia. Mohon gunakan data dengan bijak dan cantumkan sumber.';

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang   = 'id-ID';
  utter.volume = 1;
  utter.rate   = 0.85;
  utter.pitch  = 1;

  const voices = synth.getVoices();
  const idVoice = voices.find(v => v.lang.includes('id'));
  if (idVoice) utter.voice = idVoice;

  btn.innerHTML = '🔊 Memutar...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  utter.onend = () => {
    btn.innerHTML = '🔊 Putar Lagi';
    btn.style.opacity = '1';
    btn.disabled = false;
  };

  synth.cancel();
  synth.speak(utter);
}

btn.addEventListener('click', playGreeting);
