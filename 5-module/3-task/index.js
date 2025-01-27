function initCarousel() {
  const carouselInner = document.querySelector(".carousel__inner");
  const slides = document.querySelectorAll(".carousel__slide");
  const leftArrow = document.querySelector(".carousel__arrow_left");
  const rightArrow = document.querySelector(".carousel__arrow_right");

  let currentSlide = 0;
  const slideWidth = slides[0].offsetWidth;

  function updateArrows() {
    leftArrow.style.display = currentSlide === 0 ? "none" : "";
    rightArrow.style.display = currentSlide === slides.length - 1 ? "none" : "";
  }

  function showNextSlide() {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      updateArrows();
    }
  }

  function showPrevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      updateArrows();
    }
  }

  rightArrow.addEventListener("click", showNextSlide);
  leftArrow.addEventListener("click", showPrevSlide);

  updateArrows();
}
