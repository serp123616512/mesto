import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (selector) {
    super(selector);
    this._popupImage = this._popup.querySelector('.popup__pic');
    this._popupName = this._popup.querySelector('.popup__title');
  }

  open(item) {
    this._popupImage.src = item.link;
    this._popupImage.alt = item.name;
    this._popupName.textContent = item.name;
    super.open();
  }
}
