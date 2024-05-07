
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addButton = document.getElementById('add-button');

document.addEventListener('DOMContentLoaded', function() {
  const inputBox = document.getElementById('input-box');
  const charCount = document.getElementById('char-count');
  const maxLength = inputBox.getAttribute('maxlength');

  inputBox.addEventListener('input', function() {
    const remaining = maxLength - inputBox.value.length;
    charCount.textContent = `${remaining}`;

        // Update class based on remaining characters
        if (remaining <= 20) {  
          charCount.classList.add('near-limit');
        } else {
          charCount.classList.remove('near-limit');
        }
  });
});

function addTask(){
  if (inputBox.value === '') {
    alert('Please enter a task');
  } else {
    let li = document.createElement('li');
    li.textContent = inputBox.value;  
    listContainer.appendChild(li);
    inputBox.value = '';  
    let span = document.createElement('span');
    span.innerHTML = "\u00D7";
    li.appendChild(span);
  }
}

listContainer.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove ();
  }
});

addButton.addEventListener('click', addTask);  

inputBox.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();  
  }
});