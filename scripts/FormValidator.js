export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasValidInput(inputList) {
    return inputList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  }

  disableSubmitButton(submitButtonElement) {
    submitButtonElement.classList.add(this._inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  }

  _enableSubmitButton(submitButtonElement) {
    submitButtonElement.classList.remove(this._inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }

  resetFormInputError() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  _toggleSubmitButtonState(inputList, submitButtonElement) {
    if (!this._hasValidInput(inputList)) {
      this.disableSubmitButton(submitButtonElement);
    } else {
      this._enableSubmitButton(submitButtonElement);
    };
  }

  enableValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState(inputList, submitButtonElement);
      });
    });
  }
}
