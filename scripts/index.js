const profileNameElement = document.querySelector('.profile__name');
const profileVocationElement = document.querySelector('.profile__vocation');
const popupOpenButton = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close');
const popupFormElement = popupElement.querySelector('.popup__content');
const popupInputNameElement = popupFormElement.querySelector('#name');
const popupInputVocationElement = popupFormElement.querySelector('#vocation');
const cardsListElement = document.querySelector('.cards');
const cardsTemplateElement = document.querySelector('#cards-template').content;
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

const popupOpen = function () {
  popupElement.classList.add('popup__open');
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputVocationElement.value = profileVocationElement.textContent;
}

const popupClose = function () {
  popupElement.classList.remove('popup__open');
}

const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputNameElement.value;
  profileVocationElement.textContent = popupInputVocationElement.value;
  popupClose();
}

const createCardElement = cards => {
  const cardElement = cardsTemplateElement.cloneNode(true);
  const cardName = cardElement.querySelector('.card__name');
  cardName.textContent = cards.name;
  const cardPictureLink = cardElement.querySelector('.card__pic');
  cardPictureLink.src = cards.link;
  return cardElement;
}

initialCards.forEach(function(cards) {
  const card = createCardElement(cards);
  cardsListElement.prepend(card);
});


popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popupFormElement.addEventListener('submit', formSubmitHandler);






