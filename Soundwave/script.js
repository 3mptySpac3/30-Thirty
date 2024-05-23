// Example function to start the soundwave animation
function startSoundwave() {
  document.querySelector('.soundwave').style.animationPlayState = 'running';
}

// Example function to stop the soundwave animation
function stopSoundwave() {
  document.querySelector('.soundwave').style.animationPlayState = 'paused';
}

// Start the soundwave animation when the document loads
document.addEventListener('DOMContentLoaded', (event) => {
  startSoundwave();
});
