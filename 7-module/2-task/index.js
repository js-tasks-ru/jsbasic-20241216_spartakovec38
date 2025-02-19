import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    // Создаем HTML-структуру модального окна
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }

  open() {
    // Добавляем модальное окно в body и добавляем класс is-modal-open
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  setTitle(title) {
    // Устанавливаем заголовок модального окна
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    // Очищаем содержимое модального окна и добавляем новое
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  close() {
    // Удаляем модальное окно и убираем класс is-modal-open
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
    // Удаляем обработчик события keydown
    document.removeEventListener('keydown', this.onKeyDown);
  }

  addEventListeners() {
    // Закрытие по клику на кнопку [X]
    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close());

    // Закрытие по нажатию на ESC
    this.onKeyDown = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', this.onKeyDown);
  }
}
