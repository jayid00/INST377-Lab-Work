let slidePosition = 0;
const slides = document.querySelectorAll('.carousel_item'),
      totalSlides = slides.length;


document.querySelector('#next')
        .addEventListener("click", function() {
          moveToNextSlide();
        })

document.querySelector('#prev')
        .addEventListener("click", function() {
          moveToPrevSlide();
                })

function updateSlide() {
  for (let slide of slides) {
    slide.classList.remove('carousel_item--visible');
    slide.classList.add('carousel_item--hidden')
  }

  slides[slidePosition].classList.add('carousel_item--visible');

}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  }
  else {
    slidePosition++;
  }
  updateSlide();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  }
  else {
    slidePosition--;
  }
  updateSlide();
}
