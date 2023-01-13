import { openPopup, popupPictureElement } from './index.js';


export class Card {
  constructor(card) {
    this._name = card.name;
    this._link = card.link;
  }

  _getTemplateElement() {
    const cardElement = document
    .querySelector('#card-template')
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  getCardElement() {
    this._element = this._getTemplateElement();
    this._setEventListeners();

    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__pic').src = this._link;
    this._element.querySelector('.card__pic').alt = this._name;

    return this._element;
  }

  _handleLikeButtonClick() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleTrashButtonClick() {
    this._element.remove();
    this._element = null;
  }

  _handlePreviewPicture() {
    popupPictureElement.querySelector('.popup__pic').src = this._link;
    popupPictureElement.querySelector('.popup__title').alt = this._name;
    popupPictureElement.querySelector('.popup__title').textContent = this._name;
    openPopup(popupPictureElement);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeButtonClick();
    });
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._handleTrashButtonClick();
    });
    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._handlePreviewPicture();
    });
  }
}
