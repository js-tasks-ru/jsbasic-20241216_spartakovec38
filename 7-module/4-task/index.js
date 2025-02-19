export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.initEventListeners();
    this.updateSlider();
  }

  render() {
    const sliderElement = document.createElement('div');
    sliderElement.className = 'slider';

    const thumb = document.createElement('div');
    thumb.className = 'slider__thumb';
    const valueDisplay = document.createElement('span');
    valueDisplay.className = 'slider__value';
    valueDisplay.textContent = this.value;
    thumb.appendChild(valueDisplay);
    sliderElement.appendChild(thumb);

    const progress = document.createElement('div');
    progress.className = 'slider__progress';
    sliderElement.appendChild(progress);

    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'slider__steps';
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      if (i === this.value) {
        step.className = 'slider__step-active';
      }
      stepsContainer.appendChild(step);
    }
    sliderElement.appendChild(stepsContainer);

    return sliderElement;
  }

  initEventListeners() {
    this.elem.addEventListener('click', (event) => this.onClick(event));
    this.elem.querySelector('.slider__thumb').addEventListener('pointerdown', (event) => this.onPointerDown(event));
    this.elem.querySelector('.slider__thumb').ondragstart = () => false;
  }

  onClick(event) {
    this.moveSlider(event.clientX);
    this.dispatchChangeEvent();
  }

  onPointerDown(event) {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');

    const onMove = (event) => this.moveSlider(event.clientX);
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      this.elem.classList.remove('slider_dragging');
      this.dispatchChangeEvent();
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  moveSlider(clientX) {
    const rect = this.elem.getBoundingClientRect();
    let leftRelative = (clientX - rect.left) / rect.width;
    leftRelative = Math.max(0, Math.min(1, leftRelative));

    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);

    // Используем `leftRelative`, а не округленное значение для точного позиционирования
    const leftPercents = leftRelative * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    this.updateSlider();
  }

  updateSlider() {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const steps = this.elem.querySelectorAll('.slider__steps span');

    const leftPercents = (this.value / (this.steps - 1)) * 100;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    thumb.querySelector('.slider__value').textContent = this.value;

    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });
  }

  dispatchChangeEvent() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }
}
