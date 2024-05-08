// Initialize constants for elements used across multiple functions
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addButton = document.getElementById('add-button');
const charCount = document.getElementById('char-count');
const maxLength = inputBox.getAttribute('maxlength');

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the character count on page load
  updateCharCount();

  inputBox.addEventListener('input', function() {
    updateCharCount();
  });

  addButton.addEventListener('click', addTask);
  
  inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  // Load saved data on page load
  loadData();

  listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
      saveData();
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.remove();
      saveData();
    }
  });
});

function updateCharCount() {
  const remaining = maxLength - inputBox.value.length;
  charCount.textContent = `${remaining} characters remaining`;
  // Update class based on remaining characters
  if (remaining <= 5) {  
    charCount.classList.add('near-limit');
  } else {
    charCount.classList.remove('near-limit');
  }
}

function addTask() {
  if (inputBox.value.trim() === '') {
    alert('Please enter a task');
    return; // Prevent further execution if input is empty
  }
  let li = document.createElement('li');
  li.textContent = inputBox.value;  
  listContainer.appendChild(li);
  let span = document.createElement('span');
  span.textContent = "\u00D7"; // Use textContent for safety
  li.appendChild(span);
  inputBox.value = '';  // Clear input box
  updateCharCount(); // Update character count after adding task
  saveData(); // Save data after adding task
}

function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}

function loadData() {
  listContainer.innerHTML = localStorage.getItem('data');
}
