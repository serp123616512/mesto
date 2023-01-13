import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { configValidator } from './configValidator.js';
import { FormValidator } from './FormValidator.js';

export const popupPictureElement = document.querySelector('#picture');

const profileNameElement = document.querySelector('.profile__name');
const profileVocationElement = document.querySelector('.profile__vocation');

const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
const popupProfileElement = document.querySelector('#profile');
const popupProfileFormElement = popupProfileElement.querySelector('.popup__content');
const popupProfileInputNameElement = popupProfileFormElement.querySelector('#name');
const popupProfileInputVocationElement = popupProfileFormElement.querySelector('#vocation');
const popupProfileSubmitButton = popupProfileFormElement.querySelector('.popup__accept');
const popupProfileFormValidator = new FormValidator(configValidator, popupProfileFormElement);

const popupCardOpenButton = document.querySelector('.profile__add-btn');
const popupCardElement = document.querySelector('#card');
const popupCardFormElement = popupCardElement.querySelector('.popup__content');
const popupCardInputTitleElement = popupCardFormElement.querySelector('#title');
const popupCardInputLinkElement = popupCardFormElement.querySelector('#link');
const popupCardSubmitButton = popupCardFormElement.querySelector('.popup__accept');
const popupCardFormValidator = new FormValidator(configValidator, popupCardFormElement);

const cardsListElement = document.querySelector('.cards');

const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickOnEscape);
}

const closePopupByClickOnEscape = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickOnEscape);
}

const openPopupProfile = () => {
  openPopup(popupProfileElement);
  popupProfileInputNameElement.value = profileNameElement.textContent;
  popupProfileInputVocationElement.value = profileVocationElement.textContent;
  popupProfileFormValidator.resetFormInputError(popupProfileFormElement);
  popupProfileFormValidator.disableSubmitButton(popupProfileSubmitButton);
}

const openPopupCard = () => {
  openPopup(popupCardElement);
  popupCardFormElement.reset();
  popupCardFormValidator.resetFormInputError(popupCardFormElement);
  popupCardFormValidator.disableSubmitButton(popupCardSubmitButton);
}

const handleFormSubmitProfile = evt => {
  evt.preventDefault();
  profileNameElement.textContent = popupProfileInputNameElement.value;
  profileVocationElement.textContent = popupProfileInputVocationElement.value;
  closePopup(popupProfileElement);
}

const renderCardElement = (item) => {
  const card = new Card(item);
  const cardElement = card.getCardElement();
  cardsListElement.prepend(cardElement);
}

const handleFormSubmitCard = evt => {
  evt.preventDefault();
  const inputCardObject = {};

  inputCardObject.name = popupCardInputTitleElement.value;
  inputCardObject.link = popupCardInputLinkElement.value;

  renderCardElement(inputCardObject);
  closePopup(popupCardElement);
}

initialCards.forEach(item => {
  renderCardElement(item);
});

popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupCardOpenButton.addEventListener('click', openPopupCard);

popupCardFormElement.addEventListener('submit', handleFormSubmitCard);
popupProfileFormElement.addEventListener('submit', handleFormSubmitProfile);

popupProfileElement.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closePopup(popupProfileElement);
  }
});

popupCardElement.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closePopup(popupCardElement);
  }
});

popupPictureElement.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
    closePopup(popupPictureElement);
  }
});

popupProfileFormValidator.enableValidation();
popupCardFormValidator.enableValidation();
