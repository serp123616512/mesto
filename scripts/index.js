const profileNameElement = document.querySelector('.profile__name');
const profileVocationElement = document.querySelector('.profile__vocation');
const popupOpenButtonProfile = document.querySelector('.profile__edit-btn');
const popupElementProfile = document.querySelector('#profile');
const popupCloseButtonProfile = popupElementProfile.querySelector('.popup__close');
const popupFormElementProfile= popupElementProfile.querySelector('.popup__content');
const popupInputNameElement = popupFormElementProfile.querySelector('#name');
const popupInputVocationElement = popupFormElementProfile.querySelector('#vocation');
const popupElementCard = document.querySelector('#card');
const popupOpenButtonCards = document.querySelector('.profile__add-btn');
const popupCloseButtonCards = popupElementCard.querySelector('.popup__close');
const popupFormElementCards = popupElementCard.querySelector('.popup__content');
const popupInputTitleElement = popupFormElementCards.querySelector('#title');
const popupInputLinkElement = popupFormElementCards.querySelector('#link');
const popupElementPicture = document.querySelector('#picture');
const popupCloseButtonPicture = popupElementPicture.querySelector('.popup__close');
const popupPictureLink = popupElementPicture.querySelector('.popup__pic');
const popupPictureTitle = popupElementPicture.querySelector('.popup__title');
const cardsListElement = document.querySelector('.cards');
const cardsTemplateElement = document.querySelector('#cards-template').content;
const inputCardsArray = {name: '', link: '',};
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupOpen = popup => {
  popup.classList.add('popup__open');
}

const popupInputValueProfile = () => {
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputVocationElement.value = profileVocationElement.textContent;
}

const popupOpenProfile = () => {
  popupInputValueProfile();
  popupOpen(popupElementProfile);
}

const popupInputValueCard = () => {
  popupInputTitleElement.value = '';
  popupInputLinkElement.value = '';
}

const popupOpenCard = () => {
  popupInputValueCard();
  popupOpen(popupElementCard);
}

const popupOpenPicture = () => {
  popupOpen(popupElementPicture);
}

const popupClose = popup => {
  popup.classList.remove('popup__open');
}

const popupCloseProfile = () => {
  popupClose(popupElementProfile);
}

const popupCloseCard = () => {
  popupClose(popupElementCard);
}

const popupClosePicture = () => {
  popupClose(popupElementPicture);
}

const formSubmitHandlerProfile = (evt, popup) => {
  evt.preventDefault();
  popupClose(popup);
}

const popupAcceptProfile = evt => {
  profileNameElement.textContent = popupInputNameElement.value;
  profileVocationElement.textContent = popupInputVocationElement.value;
  formSubmitHandlerProfile(evt, popupElementProfile);
}

const renderCard = (cards, element) => {
  element.prepend(createCardElement(cards));
}

const createCardElement = cards => {
  const cardElement = cardsTemplateElement.cloneNode(true);
  const cardName = cardElement.querySelector('.card__name');
  cardName.textContent = cards.name;
  const cardPictureLink = cardElement.querySelector('.card__pic');
  cardPictureLink.src = cards.link;
  cardElement.querySelector('.card__like').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__trash').addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });
  cardElement.querySelector('.card__pic-popup').addEventListener('click', evt => {
    popupPictureLink.src = evt.target.src;
    popupPictureTitle.textContent = evt.target.closest('.card').querySelector('.card__name').textContent;
    popupOpenPicture();
  });
  return cardElement;
}

const popupAcceptCard = evt => {
  inputCardsArray.name = popupInputTitleElement.value;
  inputCardsArray.link = popupInputLinkElement.value;
  renderCard(inputCardsArray, cardsListElement);
  formSubmitHandlerProfile(evt, popupElementCard);
}

initialCards.forEach(cards => {
  renderCard(cards, cardsListElement);
});

popupOpenButtonProfile.addEventListener('click', popupOpenProfile);
popupCloseButtonProfile.addEventListener('click', popupCloseProfile);
popupFormElementProfile.addEventListener('submit', popupAcceptProfile);
popupOpenButtonCards.addEventListener('click', popupOpenCard);
popupCloseButtonCards.addEventListener('click', popupCloseCard);
popupFormElementCards.addEventListener('submit', popupAcceptCard);
popupCloseButtonPicture.addEventListener('click', popupClosePicture);





