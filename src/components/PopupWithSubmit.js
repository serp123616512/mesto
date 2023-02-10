import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({handleFormSubmit, submitText}, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitTextDefault = submitText.default;
    this._submitTextProcess = submitText.process;
    this._submitTextAccept = submitText.accept;
    this._submitButton = this._popup.querySelector('.popup__accept');
  }

  open(item) {
    this._cardId = item._id;
    console.log(this._cardId);
    super.open();
  }

  setEventListeners(disableSubmitButton, enableSubmitButton) {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      console.log('!!!');
      this._submitButton.textContent = this._submitTextProcess;
      disableSubmitButton();
      this._handleFormSubmit(this._cardId)
      .then(() => {
        this._submitButton.textContent = this._submitTextAccept;
        setTimeout(() => {this.close()}, 200);
        setTimeout(() => {
          this._submitButton.textContent = this._submitTextDefault;
          enableSubmitButton();
        }, 1500);
      })
      .catch(err => {
        this._submitButton.textContent = err;
        console.log(err);
        setTimeout(() => {this._submitButton.textContent = this._submitTextDefault;}, 1000);
      });
    });
  }
}
