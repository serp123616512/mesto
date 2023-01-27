export default class PopupWithImage extends Popup {
  constructor (selector) {
    super(selector);
    this._popupImage = super._popup.querySelector('.popup__pic');
    this._popupName = super._popup.querySelector('.popup__title');
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupName.textContent = name;
    super.open();
  }
}
