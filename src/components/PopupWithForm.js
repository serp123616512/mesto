import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__content');
    this._inputList = this._popup.querySelectorAll('.popup__input-text');
    this._submitButton = this._popup.querySelector('.popup__accept');
    this.close = this.close.bind(this);
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach(input => {
      this._values[input.id] = input.value;
    })

    return this._values;
  }

  setInputValues(values) {
    this._inputList.forEach(input => {
      input.value = values[input.id];
    })
  }

  close() {
    super.close();
    setTimeout(() => {this._form.reset()}, 500);
  }

  setSubmitText(submitText) {
    this._submitButton.textContent = submitText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    });
  }
}
