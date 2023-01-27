import { initialCards } from './cards.js';
import { configValidator } from './configValidator.js';
import Section from './Section.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';



const profileNameElement = document.querySelector('.profile__name');
const profileVocationElement = document.querySelector('.profile__vocation');

const popupList = Array.from(document.querySelectorAll('.popup'));
const formList = Array.from(document.querySelectorAll('.popup__content'));

const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
const popupProfileElement = document.querySelector('#profile');
const popupProfileFormElement = document.forms['profile-form'];
const popupProfileInputNameElement = popupProfileFormElement.querySelector('#name');
const popupProfileInputVocationElement = popupProfileFormElement.querySelector('#vocation');

const popupCardOpenButton = document.querySelector('.profile__add-btn');
const popupCardElement = document.querySelector('#card');
const popupCardFormElement = document.forms['card-form'];
const popupCardInputTitleElement = popupCardFormElement.querySelector('#title');
const popupCardInputLinkElement = popupCardFormElement.querySelector('#link');

const popupPictureElement = document.querySelector('#picture');
const popupPictureImage = popupPictureElement.querySelector('.popup__pic');
const popupPictureName = popupPictureElement.querySelector('.popup__title');

const cardsListElement = document.querySelector('.cards');

const formValidatorNames = {};

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  vocationSelector: '.profile__vocation',
});

const popupProfile = new PopupWithForm ({
  handleFormSubmit: inputValues => {
    userInfo.setUserInfo({
      name: inputValues.name,
      vocation: inputValues.vocation,
    });
  }
}, '#profile');

const popupCard = new PopupWithForm ({
  handleFormSubmit: inputValues => {
    const inputCardObject = {};

    inputCardObject.name = inputValues.title;
    inputCardObject.link = inputValues.link;

  renderCardElement(inputCardObject);
  }
});


const createCard = (item) => {
  const card = new Card(item, '#card-template', openPopupPicture);
  const cardElement = card.getCardElement();
  return cardElement;
}

const renderCardElement = (item) => {
  const cardElement = createCard(item);
  cardsListElement.prepend(cardElement);
}

const section = new Section({
  items: initialCards,
  renderer: renderCardElement(item)
}, '.cards');

section.renerItems();

































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
  formValidatorNames['profile-form'].resetFormInputError();

}

const openPopupCard = () => {
  openPopup(popupCardElement);
  popupCardFormElement.reset();
  formValidatorNames['card-form'].resetFormInputError();
}

const handleFormSubmitProfile = evt => {
  evt.preventDefault();
  profileNameElement.textContent = popupProfileInputNameElement.value;
  profileVocationElement.textContent = popupProfileInputVocationElement.value;
  closePopup(popupProfileElement);
}

const openPopupPicture = (link, name) => {
  popupPictureImage.src = link;
  popupPictureImage.alt = name;
  popupPictureName.textContent = name;
  openPopup(popupPictureElement);
}

const createCard = (item) => {
  const card = new Card(item, '#card-template', openPopupPicture);
  const cardElement = card.getCardElement();
  return cardElement;
}

const renderCardElement = (item) => {
  const cardElement = createCard(item);
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

initialCards.forEach(renderCardElement);

popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupCardOpenButton.addEventListener('click', openPopupCard);

popupCardFormElement.addEventListener('submit', handleFormSubmitCard);
popupProfileFormElement.addEventListener('submit', handleFormSubmitProfile);

popupList.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  })
})

const enableValidation = config => {
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formValidatorName = formElement.getAttribute('name');
    formValidatorNames[formValidatorName] = validator;
    validator.enableValidation();
  })
}

enableValidation(configValidator);
