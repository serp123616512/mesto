export default class Card {
  constructor({item, handlePreviewPicture, handleTrashButtonClick} , cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardTemplateElement = document.querySelector(cardSelector);
    this._handlePreviewPicture = handlePreviewPicture;
    this._handleTrashButtonClick = handleTrashButtonClick;
  }

  _getTemplateElement() {
    const cardElement =  this._cardTemplateElement
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  getCardElement() {
    this._element = this._getTemplateElement();

    this._cardButtonLikeElement = this._element.querySelector('.card__like');
    this._cardButtonTrashElement = this._element.querySelector('.card__trash');
    this._cardNameElement = this._element.querySelector('.card__name');
    this._cardPictureElement = this._element.querySelector('.card__pic');

    this._setEventListeners();

    this._cardNameElement.textContent = this._name;
    this._cardPictureElement.src = this._link;
    this._cardPictureElement.alt = this._name;

    return this._element;
  }

  _handleLikeButtonClick() {
    this._cardButtonLikeElement.classList.toggle('card__like_active');
  }

  _setEventListeners() {
    this._cardButtonLikeElement.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });
    this._cardButtonTrashElement.addEventListener('click', () => {
      this._handleTrashButtonClick();
    });
    this._cardPictureElement.addEventListener('click', () => {
      this._handlePreviewPicture(this._link, this._name);
    });
  }
}
