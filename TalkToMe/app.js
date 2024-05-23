document.addEventListener('DOMContentLoaded', function() {
  const textInput = document.getElementById('text-input');
  const speakButton = document.getElementById('speak-button');
  const voiceSelect = document.getElementById('voice-select');
  const wavePath = document.querySelector('#sound-wave path');
  let voices = [];

  function populateVoices() {
      voices = speechSynthesis.getVoices();
      voiceSelect.innerHTML = '';
      voices.forEach((voice, index) => {
          const option = document.createElement('option');
          option.value = index;
          option.textContent = `${voice.name} (${voice.lang})`;
          voiceSelect.appendChild(option);
      });
  }

  populateVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
  }

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateWavePath() {
      let pathData = 'M 0 5';
      for (let i = 1; i <= 20; i++) {
          const x = i * 5;
          const y = getRandomInt(2, 8);
          pathData += ` L ${x} ${y}`;
      }
      return pathData;
  }

  function startWaveAnimation() {
      wavePath.style.animationPlayState = 'running';
      function animateWave() {
          wavePath.setAttribute('d', generateWavePath());
          if (speechSynthesis.speaking) {
              requestAnimationFrame(animateWave);
          }
      }
      animateWave();
  }

  function stopWaveAnimation() {
      wavePath.style.animationPlayState = 'paused';
      wavePath.setAttribute('d', 'M 0 5 Q 20 0, 40 5 T 100 5');
  }

  speakButton.addEventListener('click', function() {
      const text = textInput.value;
      if (text.trim() !== '') {
          const utterance = new SpeechSynthesisUtterance(text);
          const selectedVoiceIndex = voiceSelect.value;
          utterance.voice = voices[selectedVoiceIndex];

          utterance.onstart = startWaveAnimation;
          utterance.onend = stopWaveAnimation;

          speechSynthesis.speak(utterance);
      }
  });

  // Initially pause the animation
  stopWaveAnimation();
});
