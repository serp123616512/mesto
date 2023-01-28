import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__content');
    this._inpotList = this._popup.querySelectorAll('.popup__input-text');
  }

  _getInputValues() {
    this._values = {};
    this._inpotList.forEach(input => {
      this._values[input.id] = input.value;
    })

    return this._values;
  }

  close() {
    super.close();
    setTimeout(() => {this._form.reset()}, 500);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
