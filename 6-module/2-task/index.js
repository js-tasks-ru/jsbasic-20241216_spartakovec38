import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.createCard();
  }

  createCard() {
    let formattedPrice = `€${this.product.price.toFixed(2)}`;
    let imagePath = `/assets/images/products/${this.product.image}`;
    let cardHTML = `
            <div class="card">
                <div class="card__top">
                    <img src="${imagePath}" class="card__image" alt="product">
                    <span class="card__price">${formattedPrice}</span>
                </div>
                <div class="card__body">
                    <div class="card__title">${this.product.name}</div>
                    <button type="button" class="card__button">
                        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                    </button>
                </div>
            </div>
        `;
    let cardElement = createElement(cardHTML);
    let addButton = cardElement.querySelector(".card__button");
    addButton.addEventListener("click", this.onAddButtonClick.bind(this));
    return cardElement;
  }

  onAddButtonClick() {
    let event = new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true,
    });

    this.elem.dispatchEvent(event);
  }
}
