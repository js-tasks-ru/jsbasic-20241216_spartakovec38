export default class StepSlider {
  constructor({ steps, value }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render(); // создаем элемент слайдера
    this.initEventListeners(); // инициализируем обработчики событий
    // Убираем вызов updateSlider из конструктора для предотвращения сбоев
    this.updateSlider(); // обновляем визуальное состояние слайдера
  }

  render() {
    const sliderElement = document.createElement("div");
    sliderElement.className = "slider";

    // Создаем ползунок
    const thumb = document.createElement("div");
    thumb.className = "slider__thumb";
    const valueDisplay = document.createElement("span");
    valueDisplay.className = "slider__value";
    valueDisplay.textContent = this.value;
    thumb.appendChild(valueDisplay);
    sliderElement.appendChild(thumb);

    // Создаем заполненную область
    const progress = document.createElement("div");
    progress.className = "slider__progress";
    sliderElement.appendChild(progress);

    // Создаем шаги слайдера
    const stepsContainer = document.createElement("div");
    stepsContainer.className = "slider__steps";
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement("span");
      if (i === this.value) {
        step.className = "slider__step-active"; // активный элемент
      }
      stepsContainer.appendChild(step);
    }
    sliderElement.appendChild(stepsContainer);

    return sliderElement;
  }

  initEventListeners() {
    this.elem.onclick = (event) => {
      // Вычисляем позицию клика внутри слайдера
      const left = event.clientX - this.elem.getBoundingClientRect().left;
      const leftRelative = left / this.elem.offsetWidth;

      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);

      this.updateSlider(); // обновляем визуальное состояние слайдера

      // Генерируем событие slider-change
      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        })
      );
    };
  }

  updateSlider() {
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");
    const steps = this.elem.querySelectorAll(".slider__steps span");

    // Обновляем положение ползунка
    const segments = this.steps - 1;
    const leftPercents = (this.value / segments) * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    // Обновляем значение ползунка
    thumb.querySelector(".slider__value").textContent = this.value;

    // Обновляем активный шаг
    steps.forEach((step, index) => {
      step.classList.remove("slider__step-active"); // Убираем класс у всех шагов
      if (index === this.value) {
        step.classList.add("slider__step-active"); // Добавляем класс к текущему шагу
      }
    });
  }
}

// Пример использования класса
const config = { steps: 5, value: 0 };
const slider = new StepSlider(config);

// Добавляем слайдер на страницу
document.body.append(slider.elem);
