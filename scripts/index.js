import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { configValidator } from './configValidator.js';
import { FormValidator } from './FormValidator.js';

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

const popupPictureElement = document.querySelector('#picture');
const popupPictureImageElement = popupPictureElement.querySelector('.popup__pic');
const popupPictureTitleElement = popupPictureElement.querySelector('.popup__title');

const cardsListElement = document.querySelector('.cards');

const cardTemplateElement = document.querySelector('#card-template').content;

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

const openPopup = popup => {
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

//const openPopupPicture = card => {
 // openPopup(popupPictureElement);
 // popupPictureImageElement.src = card.link;;
 // popupPictureImageElement.alt = card.name;
 //  popupPictureTitleElement.textContent = card.name;
//}

//const createCardElement = card => {
//  const cardElement = cardTemplateElement.cloneNode(true);
//
//  const cardName = cardElement.querySelector('.card__name');
//  cardName.textContent = card.name;
//
// const cardPictureImage = cardElement.querySelector('.card__pic');
//  cardPictureImage.src = card.link;
//  cardPictureImage.alt = card.name;
//
//  cardElement.querySelector('.card__like').addEventListener('click', handleLikeButtonClick);
// cardElement.querySelector('.card__trash').addEventListener('click', handleTrashButtonClick);
//  cardElement.querySelector('.card__pic').addEventListener('click', () => openPopupPicture(card));
//
//  return cardElement;
//}

const renderCardElement = (card) => {
  const cardElement = new Card(card, closePopupByClickOnEscape);
  cardsListElement.prepend(cardElement.getCardElement());
}

const handleFormSubmitCard = evt => {
  evt.preventDefault();
  const inputCardObject = {};

  inputCardObject.name = popupCardInputTitleElement.value;
  inputCardObject.link = popupCardInputLinkElement.value;

  renderCardElement(inputCardObject);
  closePopup(popupCardElement);
}

initialCards.forEach(card => {
  renderCardElement(card);
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
