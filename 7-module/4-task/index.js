export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.createSlider();
    this.addEventListeners();

    // Устанавливаем начальное значение после создания DOM-элемента
    this.setValue(this.value);
  }

  createSlider() {
    const slider = document.createElement('div');
    slider.className = 'slider';

    const sliderThumb = document.createElement('div');
    sliderThumb.className = 'slider__thumb';
    sliderThumb.innerHTML = `<span class="slider__value">${this.value}</span>`;

    const sliderProgress = document.createElement('div');
    sliderProgress.className = 'slider__progress';

    const sliderSteps = document.createElement('div');
    sliderSteps.className = 'slider__steps';

    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      sliderSteps.appendChild(step);
    }

    slider.appendChild(sliderThumb);
    slider.appendChild(sliderProgress);
    slider.appendChild(sliderSteps);

    return slider;
  }

  addEventListeners() {
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', this.onPointerDown.bind(this));
    document.addEventListener('pointermove', this.onPointerMove.bind(this));
    document.addEventListener('pointerup', this.onPointerUp.bind(this));

    // Обработка кликов по слайдеру
    this.elem.addEventListener('click', this.onClick.bind(this));
  }

  onPointerDown(event) {
    this.elem.classList.add('slider_dragging');
    this.moveThumb(event);
  }

  onPointerMove(event) {
    if (!this.elem.classList.contains('slider_dragging')) return;
    this.moveThumb(event);
  }

  onPointerUp(event) {
    this.elem.classList.remove('slider_dragging');
    this.setValue(this.value);

    // Генерация события изменения значения
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  onClick(event) {
    const sliderRect = this.elem.getBoundingClientRect();
    const left = event.clientX - sliderRect.left;
    const leftRelative = left / sliderRect.width;
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    const value = Math.round(approximateValue);

    this.setValue(value);

    // Генерация события изменения значения
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  moveThumb(event) {
    const sliderRect = this.elem.getBoundingClientRect();
    let left = event.clientX - sliderRect.left;
    let leftRelative = left / sliderRect.width;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    const leftPercents = leftRelative * 100;
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);

    this.updateSliderValue();
  }

  setValue(value) {
    this.value = value;
    const leftPercents = (this.value / (this.steps - 1)) * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    this.updateSliderValue();
  }

  updateSliderValue() {
    const sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = this.value;

    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });
  }
}