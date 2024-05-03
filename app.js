
const scrollable = document.querySelector('.scrollable');
const content = document.querySelector('.content');
const imgSections = [...document.querySelectorAll('.img-section')];

const images = [...document.querySelectorAll('.img')];  

images.forEach((image, idx) => {
  image.style.backgroundImage = `url(./images/${idx + 1}.jpeg)`;  
});