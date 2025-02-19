import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories; // Сохраняем переданные категории
    this.elem = this.createRibbon(); // Создаем DOM-элемент меню
    this.ribbonInner = this.elem.querySelector('.ribbon__inner'); // Находим внутренний элемент ленты
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left'); // Находим кнопку "назад"
    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right'); // Находим кнопку "вперед"
    this.ribbonInner.addEventListener('scroll', this.updateArrowsVisibility.bind(this)); // Обработчик прокрутки
    this.arrowLeft.addEventListener('click', this.scrollLeft.bind(this)); // Обработчик клика на кнопку "назад"
    this.arrowRight.addEventListener('click', this.scrollRight.bind(this)); // Обработчик клика на кнопку "вперед"
    this.ribbonInner.addEventListener('click', this.onCategoryClick.bind(this)); // Обработчик клика по категории
    this.updateArrowsVisibility(); // Инициализация видимости кнопок
  }

  createRibbon() {
    // Создаем HTML-строку для ленты
    const ribbonHtml = `
      <div class="ribbon">
        <div class="ribbon__inner">
          ${this.categories.map(category => `
            <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
          `).join('')}
        </div>
        <button class="ribbon__arrow ribbon__arrow_left">
          &lt;
        </button>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          &gt;
        </button>
      </div>
    `;

    // Используем createElement для создания DOM-элемента
    return createElement(ribbonHtml);
  }

  scrollLeft() {
    this.ribbonInner.scrollBy(-350, 0); // Прокручиваем влево на 350px
  }

  scrollRight() {
    this.ribbonInner.scrollBy(350, 0); // Прокручиваем вправо на 350px
  }

  updateArrowsVisibility() {
    const scrollLeft = this.ribbonInner.scrollLeft; // Текущая прокрутка слева
    const scrollWidth = this.ribbonInner.scrollWidth; // Общая ширина прокрутки
    const clientWidth = this.ribbonInner.clientWidth; // Видимая ширина элемента
    const scrollRight = scrollWidth - scrollLeft - clientWidth; // Оставшаяся прокрутка справа

    // Управляем видимостью кнопки "назад"
    if (scrollLeft === 0) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    }

    // Управляем видимостью кнопки "вперед"
    if (scrollRight < 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    }
  }

  onCategoryClick(event) {
    if (event.target.classList.contains('ribbon__item')) { // Проверяем, что кликнули по ссылке
      event.preventDefault(); // Отменяем действие по умолчанию (переход по ссылке)

      // Убираем выделение с предыдущей активной категории
      const activeItem = this.ribbonInner.querySelector('.ribbon__item_active');
      if (activeItem) {
        activeItem.classList.remove('ribbon__item_active');
      }

      // Выделяем текущую категорию
      event.target.classList.add('ribbon__item_active');

      // Генерируем пользовательское событие
      const categoryId = event.target.dataset.id;
      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: categoryId, // Передаем ID категории
        bubbles: true // Событие всплывает
      }));
    }
  }
}