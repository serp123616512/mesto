const profileNameElement = document.querySelector('.profile__name');
const profileVocationElement = document.querySelector('.profile__vocation');

const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
const popupProfileElement = document.querySelector('#profile');
const popupProfileFormElement = popupProfileElement.querySelector('.popup__content');
const popupProfileInputNameElement = popupProfileFormElement.querySelector('#name');
const popupProfileInputVocationElement = popupProfileFormElement.querySelector('#vocation');

const popupCardOpenButton = document.querySelector('.profile__add-btn');
const popupCardElement = document.querySelector('#card');
const popupCardFormElement = popupCardElement.querySelector('.popup__content');
const popupCardInputTitleElement = popupCardFormElement.querySelector('#title');
const popupCardInputLinkElement = popupCardFormElement.querySelector('#link');

const popupPictureElement = document.querySelector('#picture');
const popupPictureImageElement = popupPictureElement.querySelector('.popup__pic');
const popupPictureTitleElement = popupPictureElement.querySelector('.popup__title');

const cardsListElement = document.querySelector('.cards');

const cardTemplateElement = document.querySelector('#card-template').content;

const openPopup = popup => {
  popup.classList.add('popup_status_open');
  popup.classList.remove('popup_status_close');
}

const renderInputPopupProfileValueWhenOpening = () => {
  popupProfileInputNameElement.value = profileNameElement.textContent;
  popupProfileInputVocationElement.value = profileVocationElement.textContent;
}

const renderInputPopupCardValueWhenOpening = () => {
  popupCardInputTitleElement.value = '';
  popupCardInputLinkElement.value = '';
}

const openPopupProfile = () => {
  renderInputPopupProfileValueWhenOpening();
  openPopup(popupProfileElement);
}

const openPopupCard = () => {
  renderInputPopupCardValueWhenOpening();
  openPopup(popupCardElement);
}

const closePopup = () => {
  const openedPopup = document.querySelector('.popup_status_open');
  openedPopup.classList.add('popup_status_close');
  openedPopup.classList.remove('popup_status_open');



  // это сделано для того, чтобы при закрытии попапа и последующем открытии
  //кнопка была не активна и нельзы было добавить пустую карточку
  if (openedPopup.querySelector('.popup__accept')) {
    openedPopup.querySelector('.popup__accept').setAttribute('disabled', true);
    openedPopup.querySelector('.popup__accept').classList.add('popup__accept_inactive');
    openedPopup.querySelector('.popup__accept').classList.remove('button-hover');
  }



  // а это сделано для того, чтобы при закрытии попапа и последующем открытии
  //стирались ошибки валидации

  const inputList = Array.from(openedPopup.querySelectorAll('.popup__input-text'));

  inputList.forEach(inputElement => {
    const errorElement = openedPopup.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input-text_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  });
}

const closePopupByClickOnCloseButton = evt => {
  if (evt.target.classList.contains('popup__close-btn')) {
    closePopup();
  }
}

const closePopupByClickOnOverlay = evt => {
  if (evt.target.classList.contains('popup_status_open')) {
    closePopup();
  }
}

const closePopupByClickOnEscape = evt => {
  const openedPopup = document.querySelector('.popup_status_open');

  if (openedPopup && (evt.key === 'Escape')) {
    closePopup();
  }
}

const handleFormSubmit = evt => {
  evt.preventDefault();
  closePopup();
}

const handleFormSubmitProfile = evt => {
  profileNameElement.textContent = popupProfileInputNameElement.value;
  profileVocationElement.textContent = popupProfileInputVocationElement.value;
  handleFormSubmit(evt);
}

const handleLikeButtonClick = evt => {
  evt.target.classList.toggle('card__like_active');
}

const handleTrashButtonClick = evt => {
  evt.target.closest('.card').remove();
}

const renderPopupPictureData = evt => {
  popupPictureImageElement.src = evt.target.closest('.card').querySelector('.card__pic').src;
  popupPictureImageElement.alt = evt.target.closest('.card').querySelector('.card__name').textContent;
  popupPictureTitleElement.textContent = evt.target.closest('.card').querySelector('.card__name').textContent;
}

const openPopupPicture = evt => {
  renderPopupPictureData(evt)
  openPopup(popupPictureElement);
}

const createCardElement = card => {
  const cardElement = cardTemplateElement.cloneNode(true);

  const cardName = cardElement.querySelector('.card__name');
  cardName.textContent = card.name;

  const cardPictureImage = cardElement.querySelector('.card__pic');
  cardPictureImage.src = card.link;
  cardPictureImage.alt = card.name;

  cardElement.querySelector('.card__like').addEventListener('click', handleLikeButtonClick);
  cardElement.querySelector('.card__trash').addEventListener('click', handleTrashButtonClick);
  cardElement.querySelector('.card__pic-popup').addEventListener('click', openPopupPicture);

  return cardElement;
}

const renderCardElement = card => {
  cardsListElement.prepend(createCardElement(card));
}

const handleFormSubmitCard = evt => {
  const inputCardObject = {};

  inputCardObject.name = popupCardInputTitleElement.value;
  inputCardObject.link = popupCardInputLinkElement.value;

  renderCardElement(inputCardObject);
  handleFormSubmit(evt);
}

initialCards.forEach(card => {
  renderCardElement(card);
});

popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupCardOpenButton.addEventListener('click', openPopupCard);

popupCardFormElement.addEventListener('submit', handleFormSubmitCard);
popupProfileFormElement.addEventListener('submit', handleFormSubmitProfile);

document.addEventListener('click', closePopupByClickOnCloseButton);
document.addEventListener('mousedown', closePopupByClickOnOverlay);
document.addEventListener('keydown', closePopupByClickOnEscape);
