document.addEventListener('DOMContentLoaded', function() {
  const textInput = document.getElementById('text-input');
  const speakButton = document.getElementById('speak-button');
  const voiceSelect = document.getElementById('voice-select');
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

  speakButton.addEventListener('click', function() {
      const text = textInput.value;
      if (text.trim() !== '') {
          const utterance = new SpeechSynthesisUtterance(text);
          const selectedVoiceIndex = voiceSelect.value;
          utterance.voice = voices[selectedVoiceIndex];
          speechSynthesis.speak(utterance);
      }
  });
});
