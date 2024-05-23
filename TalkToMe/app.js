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

  function updateWave(dataArray) {
      const pathData = dataArray.reduce((acc, point, index) => {
          const x = (index / dataArray.length) * 100;
          const y = (point / 255) * 10;
          return acc + ` L ${x} ${y}`;
      }, 'M 0 5');
      wavePath.setAttribute('d', pathData);
  }

  speakButton.addEventListener('click', function() {
      const text = textInput.value;
      if (text.trim() !== '') {
          const utterance = new SpeechSynthesisUtterance(text);
          const selectedVoiceIndex = voiceSelect.value;
          utterance.voice = voices[selectedVoiceIndex];

          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 256;
          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const source = audioCtx.createMediaElementSource(new Audio());
          source.connect(analyser);
          analyser.connect(audioCtx.destination);

          function draw() {
              requestAnimationFrame(draw);
              analyser.getByteFrequencyData(dataArray);
              updateWave(dataArray);
          }

          utterance.onstart = function() {
              const source = audioCtx.createMediaStreamSource(audioCtx.createMediaStreamDestination().stream);
              source.connect(analyser);
              draw();
          };

          utterance.onend = function() {
              wavePath.setAttribute('d', 'M 0 5 Q 20 0, 40 5 T 100 5');
          };

          speechSynthesis.speak(utterance);
      }
  });
});


