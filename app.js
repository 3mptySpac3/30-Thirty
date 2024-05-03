
const scrollable = document.querySelector('.scrollable');
const content = document.querySelector('.content');
const imgSections = [...document.querySelectorAll('.img-section')];

const images = [...document.querySelectorAll('.img')];  

images.forEach((image, idx) => {
  image.style.backgroundImage = `url(./images/${idx + 1}.jpeg)`;  
});


const wraps = [...document.querySelectorAll('.wrap')];
const menuTog = document.querySelector('.menu-tog');
const menu = document.querySelector('.menu');
const menuWraps = [...document.querySelectorAll('.menu-wrap')];

//set the height of the content
function init(){
  document.body.style.height = `${content.getBoundingClientRect().height}px`;
}


window.addEventListener('resize', init);
menuTog.addEventListener('click', toggleMenu)


function displayWraps(){
  wraps.forEach((wrap, idx) =>{
    setTimeout(() => {
      wrap.classList.add('active');
    }, (idx + 1) * 50); //delay
  })
}


function toggleMenu(){
  if(menu.classList.contains('active')){
      menuTog.classList.remove('active');
      toggleMenuWraps(false);
      setTimeout(() => {
          menu.classList.remove('active')
      }, 300)
      setTimeout(() => {
          toggleWraps(true);
      }, 300)
  }else{
      menuTog.classList.add('active');
      toggleWraps(false);
      setTimeout(() => {
          menu.classList.add('active')
      }, 300)
      setTimeout(() => {
          toggleMenuWraps(true);
      }, 300)
  }
}


function toggleWraps(active){
  wraps.forEach(wrap => {
      toggleWrap(wrap, active);
  })
}

function toggleMenuWraps(active){
  menuWraps.forEach(wrap => {
      toggleWrap(wrap, active);
  })
}

function toggleWrap(wrap, active){
  setTimeout(() => {
      if(active){
          wrap.classList.add('active');
      }else{
          wrap.classList.remove('active');
      }
  })
}


displayWraps();

init();