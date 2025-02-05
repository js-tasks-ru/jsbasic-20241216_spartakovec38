import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;
    this.elem = this.createCarousel();
    this.addEventListeners();
  }

  createCarousel() {
    let carouselHTML = `
            <div class="carousel">
                <div class="carousel__arrow carousel__arrow_right">
                    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                </div>
                <div class="carousel__arrow carousel__arrow_left">
                    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
                </div>
                <div class="carousel__inner">
                    ${this.slides
                      .map((slide) => this.createSlideHTML(slide))
                      .join("")}
                </div>
            </div>
        `;

    return createElement(carouselHTML);
  }

  createSlideHTML(slide) {
    let formattedPrice = `€${slide.price.toFixed(2)}`;

    let imagePath = `/assets/images/carousel/${slide.image}`;

    return `
            <div class="carousel__slide" data-id="${slide.id}">
                <img src="${imagePath}" class="carousel__img" alt="slide">
                <div class="carousel__caption">
                    <span class="carousel__price">${formattedPrice}</span>
                    <div class="carousel__title">${slide.name}</div>
                    <button type="button" class="carousel__button">
                        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                    </button>
                </div>
            </div>
        `;
  }

  addEventListeners() {
    let carouselInner = this.elem.querySelector(".carousel__inner");
    let arrowRight = this.elem.querySelector(".carousel__arrow_right");
    let arrowLeft = this.elem.querySelector(".carousel__arrow_left");

    arrowRight.addEventListener("click", () => {
      this.currentSlideIndex++;
      this.updateCarousel(carouselInner);
    });

    arrowLeft.addEventListener("click", () => {
      this.currentSlideIndex--;
      this.updateCarousel(carouselInner);
    });

    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".carousel__button")) {
        let slide = event.target.closest(".carousel__slide");
        let productId = slide.dataset.id;

        let addEvent = new CustomEvent("product-add", {
          detail: productId,
          bubbles: true,
        });
        this.elem.dispatchEvent(addEvent);
      }
    });
    this.updateCarousel(carouselInner);
  }

  updateCarousel(carouselInner) {
    let slideWidth = carouselInner.offsetWidth;
    let offset = -this.currentSlideIndex * slideWidth;
    carouselInner.style.transform = `translateX(${offset}px)`;

    let arrowRight = this.elem.querySelector(".carousel__arrow_right");
    let arrowLeft = this.elem.querySelector(".carousel__arrow_left");

    arrowLeft.style.display = this.currentSlideIndex === 0 ? "none" : "";
    arrowRight.style.display =
      this.currentSlideIndex === this.slides.length - 1 ? "none" : "";
  }
}
