export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasValidInput() {
    return this._inputList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  }

  disableSubmitButton() {
    this._submitButtonElement.classList.add(this._inactiveButtonClass);
    this._submitButtonElement.setAttribute('disabled', true);
  }

  enableSubmitButton() {
    this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    this._submitButtonElement.removeAttribute('disabled');
  }

  resetFormInputError() {
    this.disableSubmitButton();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  _toggleSubmitButtonState() {
    if (!this._hasValidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    };
  }

  enableValidation() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState();
      });
    });
  }
}
