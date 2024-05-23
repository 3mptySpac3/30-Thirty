document.addEventListener('DOMContentLoaded', function() {
  const textInput = document.getElementById('text-input');
  const speakButton = document.getElementById('speak-button');

  speakButton.addEventListener('click', function() {
      const text = textInput.value;
      if (text.trim() !== '') {
          const utterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(utterance);
      }
  });
});
