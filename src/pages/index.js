import './index.css';

import { initialCards } from '../utils/constants/cards.js';
import { configValidator } from '../utils/constants/configValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const formList = Array.from(document.querySelectorAll('.popup__content'));

const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
const popupProfileFormElement = document.forms['profile-form'];
const popupProfileInputNameElement = popupProfileFormElement.querySelector('#name');
const popupProfileInputVocationElement = popupProfileFormElement.querySelector('#vocation');

const popupCardOpenButton = document.querySelector('.profile__add-btn');

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

popupProfile.setEventListeners();

const popupCard = new PopupWithForm ({
  handleFormSubmit: inputValues => {
    const inputCardObject = {};

    inputCardObject.name = inputValues.title;
    inputCardObject.link = inputValues.link;

    renderCardElement(inputCardObject);
  }
}, '#card');

popupCard.setEventListeners();

const popupPicture = new PopupWithImage ('#picture');

popupPicture.setEventListeners();


const createCard = (item) => {
  const card = new Card({
    item: item,
    handlePreviewPicture: () => {
    popupPicture.open(item)
    },
  }, '#card-template');
  const cardElement = card.getCardElement();
  return cardElement;
}

const renderCardElement = (item) => {
  const cardElement = createCard(item);
  section.addItem(cardElement);
}

const section = new Section({
  items: initialCards,
  renderer: renderCardElement,
}, '.cards');

section.renerItems();

const enableValidation = config => {
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formValidatorName = formElement.getAttribute('name');
    formValidatorNames[formValidatorName] = validator;
    validator.enableValidation();
  })
}

enableValidation(configValidator);

popupProfileOpenButton.addEventListener('click', () => {
  const userContent = userInfo.getUserInfo();

  popupProfileInputNameElement.value = userContent.name;
  popupProfileInputVocationElement.value = userContent.vocation;

  formValidatorNames['profile-form'].resetFormInputError();

  popupProfile.open();
});

popupCardOpenButton.addEventListener('click', () => {
  formValidatorNames['card-form'].resetFormInputError();
  popupCard.open();
});
