const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

const hasValidInput = inputList => {
  return inputList.every((inputElement) => {
    return inputElement.validity.valid;
  });
}

const disableSubmitButton = (submitButtonElement, config) => {
  submitButtonElement.classList.add(config.inactiveButtonClass);
  submitButtonElement.setAttribute('disabled', true);
}

const enableSubmitButton  = (submitButtonElement, config) =>  {
  submitButtonElement.classList.remove(config.inactiveButtonClass);
  submitButtonElement.removeAttribute('disabled');
}

const toggleSubmitButtonState = (inputList, submitButtonElement, config) => {
  if (!hasValidInput(inputList)) {
    disableSubmitButton(submitButtonElement, config);
  } else {
    enableSubmitButton(submitButtonElement, config);
  };
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleSubmitButtonState(inputList, submitButtonElement, config);
    });
  });
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    setEventListeners(formElement, config);
  });
}

const config = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__accept',
  inactiveButtonClass: 'popup__accept_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active'
}

enableValidation(config);

const resetFormInputError = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config);
  });
}
