document.addEventListener('DOMContentLoaded', function() {
  const textInput = document.getElementById('text-input');
  const speakButton = document.getElementById('speak-button');
  const pauseButton = document.getElementById('pause-button');
  const voiceSelect = document.getElementById('voice-select');
  const waveAnimation = document.getElementById('wave-animation');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const copyButtons = document.querySelectorAll('.copy-text');
  let voices = [];
  let utterance;

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

  function pauseWaveAnimation() {
      waveAnimation.style.visibility = 'hidden';
  }

  speakButton.addEventListener('click', function() {
      const text = textInput.value;
      if (text.trim() !== '') {
          if (speechSynthesis.speaking) {
              speechSynthesis.cancel();
          }

          utterance = new SpeechSynthesisUtterance(text);
          const selectedVoiceIndex = voiceSelect.value;
          utterance.voice = voices[selectedVoiceIndex];

          utterance.onstart = startWaveAnimation;
          utterance.onend = stopWaveAnimation;

          speechSynthesis.speak(utterance);
          pauseButton.textContent = 'Pause'; // Reset pause button text
      }
  });

  pauseButton.addEventListener('click', function() {
      if (speechSynthesis.speaking && !speechSynthesis.paused) {
          speechSynthesis.pause();
          pauseButton.textContent = 'Resume';
          pauseWaveAnimation(); // Pause the animation
      } else if (speechSynthesis.paused) {
          speechSynthesis.resume();
          pauseButton.textContent = 'Pause';
          startWaveAnimation(); // Resume the animation
      }
  });

  // Hamburger icon click event to open modal
  hamburgerIcon.addEventListener('click', function() {
      modal.style.display = 'block';
  });

  // Close modal when the user clicks on <span> (x)
  closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
  });

  // Close modal when the user clicks anywhere outside of the modal
  window.addEventListener('click', function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  });

  // Copy text to clipboard
  copyButtons.forEach(button => {
      button.addEventListener('click', function() {
          const textToCopy = button.getAttribute('data-text');
          navigator.clipboard.writeText(textToCopy).then(() => {
              alert('Text copied to clipboard');
              modal.style.display = 'none';
              textInput.value = textToCopy; // Automatically paste into the textarea
          }).catch(err => {
              console.error('Could not copy text: ', err);
          });
      });
  });

  // Initially hide the animation
  stopWaveAnimation();
});
