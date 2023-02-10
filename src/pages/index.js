import './index.css';

import { submitTextProfile } from '../utils/constants/submitText.js';
import { submitTextCard } from '../utils/constants/submitText.js';
import { submitTextAvatar } from '../utils/constants/submitText.js';
import { submitTextTrash } from '../utils/constants/submitText.js';

import { configApi } from '../utils/constants/configApi.js';
import { initialCards } from '../utils/constants/cards.js';
import { configValidator } from '../utils/constants/configValidator.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
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

const popupAvatarOpenButton = document.querySelector('.profile__avatar');

const formValidatorNames = {};

const api = new Api({configApi});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  vocationSelector: '.profile__vocation',
  avatarSelector: '.profile__avatar',
});

const popupProfile = new PopupWithForm ({
  handleFormSubmit: (inputValues) => {
    return api.patchUserInfo({
      name: inputValues.name,
      vocation: inputValues.vocation,
    })
    .then(res => {
      userInfo.setUserInfo({
        name: res.name,
        vocation: res.about,
      });
    });
  },
  submitText: submitTextProfile,
}, '#profile');

const popupCard = new PopupWithForm ({
  handleFormSubmit: inputValues => {
    return api.postCard({
      name: inputValues.title,
      link: inputValues.link,
    })
    .then(res => {
      renderCardElement(res, {
        userId: res.owner._id,
      });
    })
  },
  submitText: submitTextCard,
}, '#card');

const popupAvatar = new PopupWithForm ({
  handleFormSubmit: () => {
    console.log('!');
  },
  submitText: submitTextAvatar,
}, '#avatar');

const popupTrash = new PopupWithSubmit ({
  handleFormSubmit: (cardId) => {
    console.log('удалили карточку');
    return api.deleteCard(cardId)
  },
  submitText: submitTextTrash,
}, '#trash-accept');

const popupPicture = new PopupWithImage ('#picture');

popupPicture.setEventListeners();


const createCard = (item, {userId}) => {
  const card = new Card({
    item: item,
    userId: userId,
    handlePreviewPicture: () => {
      popupPicture.open(item)
    },
    handleTrashButtonClick: () => {
      popupTrash.open(item);
    },
    handleLikeButtonClick: (cardId) => {
      if(card.isLiked()) {
        return api.deleteLike(cardId)
      } else {
        return api.putLike(cardId)
      }
    },
  }, '#card-template');
  const cardElement = card.getCardElement({userId});
  return cardElement;
}

const renderCardElement = (item, {userId}) => {
  const cardElement = createCard(item, {userId});
  section.addItem(cardElement);
}

const section = new Section({
  renderer: renderCardElement,
}, '.cards');

//section.renerItems();



const enableValidation = config => {
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formValidatorName = formElement.getAttribute('name');
    formValidatorNames[formValidatorName] = validator;
    validator.enableValidation();
  })
}

enableValidation(configValidator);

popupProfile.setEventListeners(formValidatorNames['profile-form'].disableSubmitButton);
popupCard.setEventListeners(formValidatorNames['card-form'].disableSubmitButton);
popupAvatar.setEventListeners(formValidatorNames['avatar-form'].disableSubmitButton);
popupTrash.setEventListeners(
  formValidatorNames['trash-accept-form'].disableSubmitButton,
  formValidatorNames['trash-accept-form'].enableSubmitButton
  );

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

popupAvatarOpenButton.addEventListener('click', () => {
  formValidatorNames['avatar-form'].resetFormInputError();
  popupAvatar.open();
});

console.log(formValidatorNames['trash-accept-form'].disableSubmitButton);

Promise.all([api.getUserData(), api.getCardData()])
.then(([userData, cardData]) => {
  console.log(userData);
  console.log(cardData);
  userInfo.getUserId({
    id: userData._id,
  });
  userInfo.setUserInfo({
    name: userData.name,
    vocation: userData.about,
  });
  userInfo.setUserAvatar({
    avatar: userData.avatar,
  });
  section.renerItems(cardData, {
    userId: userData._id,
  });
})
.catch(console.log);



//api.patchUserInfo({
//  name: 'Name',
//  vocation: 'Vocation',
//});
