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

const toggleSubmitButtonState = (inputList, submitButtonElement, config) => {
  if (!hasValidInput(inputList)) {
    submitButtonElement.classList.add(config.inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove(config.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
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
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      closePopup(evt.target.closest('.popup'));
    });

    setEventListeners(formElement, config);
  });
};

enableValidation({
  formSelector: '.popup__content',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__accept',
  inactiveButtonClass: 'popup__accept_inactive',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-error_active'
});

const resetFormInputErrorAndSubmitButton = form => {
  const inputList = Array.from(form.querySelectorAll('.popup__input-text'));
  inputList.forEach(inputElement => {
    hideInputError(form, inputElement, {inputErrorClass: 'popup__input-text_type_error', errorClass: 'popup__input-error_active'});
  });

  form.querySelector('.popup__accept').classList.add('popup__accept_inactive');
  form.querySelector('.popup__accept').setAttribute('disabled', true);
}
