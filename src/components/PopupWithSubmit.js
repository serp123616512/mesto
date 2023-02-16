import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({handleFormSubmit}, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector('.popup__accept');
    this.close = this.close.bind(this);
  }

  open(item, element) {
    this._cardId = item._id;
    this._element = element;
    super.open();
  }

  close() {
    super.close();
  }

  setSubmitText(submitText) {
        this._submitButton.textContent = submitText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit({
          cardId: this._cardId,
          element: this._element,
        })
    });
  }
}
