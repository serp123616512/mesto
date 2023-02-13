import './index.css';

import { submitTextProfile } from '../utils/constants/submitText.js';
import { submitTextCard } from '../utils/constants/submitText.js';
import { submitTextAvatar } from '../utils/constants/submitText.js';
import { submitTextTrash } from '../utils/constants/submitText.js';

import { configApi } from '../utils/constants/configApi.js';
import { configValidator } from '../utils/constants/configValidator.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

//const cardList = [];

const formList = Array.from(document.querySelectorAll('.popup__content'));

const popupProfileOpenButton = document.querySelector('.profile__edit-btn');

const popupCardOpenButton = document.querySelector('.profile__add-btn');

const popupAvatarOpenButton = document.querySelector('.profile__avatar');

const formValidatorNames = {};

const api = new Api({configApi});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  vocationSelector: '.profile__vocation',
  avatarSelector: '.profile__avatar',
});

const popupAvatar = new PopupWithForm ({
  handleFormSubmit: inputValues => {
    return api.patchUserAvatar({
      avatar: inputValues['avatar-link'],
    })
    .then(res => {
      userInfo.setUserAvatar({
        avatar: res.avatar,
      });
    })
  },
  submitText: submitTextAvatar,
}, '#avatar');

const popupProfile = new PopupWithForm ({
  handleFormSubmit: inputValues => {
    return api.patchUserInfo({
      name: inputValues.name,
      vocation: inputValues.vocation,
    })
    .then(res => {
      userInfo.setUserInfo({
        name: res.name,
        vocation: res.about,
      });
    })
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
      renderCardElement(res, res.owner._id);
    })
  },
  submitText: submitTextCard,
}, '#card');

const popupTrash = new PopupWithSubmit ({
  handleFormSubmit: (cardId) => {
    return api.deleteCard(cardId)
  },
  submitText: submitTextTrash,
}, '#trash-accept');

const popupPicture = new PopupWithImage ('#picture');

const createCard = (item, userId) => {
  const card = new Card({
    item: item,
    userId: userId,
    handlePreviewPicture: () => {
      popupPicture.open(item)
    },
    handleTrashButtonClick: (element) => {
      popupTrash.open(item, element);
    },
    handleLikeButtonClick: (cardId) => {
      if(card.isLiked()) {
        return api.deleteLike(cardId)
      } else {
        return api.putLike(cardId)
      }
    },
  }, '#card-template');
  const cardElement = card.getCardElement();
  return cardElement;
}

const renderCardElement = (item, userId) => {
  const cardElement = createCard(item, userId);
  section.addItem(cardElement);
}

const section = new Section({
  renderer: renderCardElement,
}, '.cards');

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
popupPicture.setEventListeners();

popupProfileOpenButton.addEventListener('click', () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
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

Promise.all([api.getUserData(), api.getCardData()])
.then(([userData, cardData]) => {
  userInfo.setUserInfo({
    name: userData.name,
    vocation: userData.about,
  });
  userInfo.setUserAvatar({
    avatar: userData.avatar,
  });
  section.renerItems(cardData, userData._id);
  //cardList = document.querySelectorAll('.card');
})
.catch(console.log);

/*const upDateLikesNumber = () => {
  api.getCardData()
  .then(res => {
    cardList.forEach(card => {
      const likesNumber = card.querySelector('.card__likes-number');
      likesNumber.textContent =
    })
  })

  setTimeout(() => {this.close()}, 200);
}*/
