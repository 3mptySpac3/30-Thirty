document.addEventListener('DOMContentLoaded', function() {
  const textInput = document.getElementById('text-input');
  const speakButton = document.getElementById('speak-button');
  const voiceSelect = document.getElementById('voice-select');
  const waveAnimation = document.getElementById('wave-animation');
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

  function startWaveAnimation() {
      waveAnimation.style.visibility = 'visible';
  }

  function stopWaveAnimation() {
      waveAnimation.style.visibility = 'hidden';
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

  // Initially hide the animation
  stopWaveAnimation();
});
