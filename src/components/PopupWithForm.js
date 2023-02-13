import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit, submitText}, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitTextDefault = submitText.default;
    this._submitTextProcess = submitText.process;
    this._submitTextAccept = submitText.accept;
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

  setEventListeners(disableSubmitButton) {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitButton.textContent = this._submitTextProcess;
      disableSubmitButton();
      this._handleFormSubmit(this._getInputValues())
      .then(() => {
        this._submitButton.textContent = this._submitTextAccept;
        setTimeout(() => {this.close()}, 200);
        setTimeout(() => {this._submitButton.textContent = this._submitTextDefault;}, 700);
      })
      .catch(err => {
        this._submitButton.textContent = err;
        console.log(err);
        setTimeout(() => {this._submitButton.textContent = this._submitTextDefault;}, 1000);
      });
    });
  }
}
