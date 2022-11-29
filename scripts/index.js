const profileNameElement = document.querySelector('.profile__name');
const profileVocationElement = document.querySelector('.profile__vocation');
const popupOpenButtonProfile = document.querySelector('.profile__edit-btn');
const popupElementProfile = document.querySelector('#profile');
const popupCloseButtonProfile = popupElementProfile.querySelector('.popup__close-btn');
const popupFormElementProfile= popupElementProfile.querySelector('.popup__content');
const popupInputNameElement = popupFormElementProfile.querySelector('#name');
const popupInputVocationElement = popupFormElementProfile.querySelector('#vocation');
const popupElementCard = document.querySelector('#card');
const popupOpenButtonCards = document.querySelector('.profile__add-btn');
const popupCloseButtonCards = popupElementCard.querySelector('.popup__close-btn');
const popupFormElementCards = popupElementCard.querySelector('.popup__content');
const popupInputTitleElement = popupFormElementCards.querySelector('#title');
const popupInputLinkElement = popupFormElementCards.querySelector('#link');
const popupElementPicture = document.querySelector('#picture');
const popupCloseButtonPicture = popupElementPicture.querySelector('.popup__close-btn');
const popupPictureImage = popupElementPicture.querySelector('.popup__pic');
const popupPictureTitle = popupElementPicture.querySelector('.popup__title');
const cardsListElement = document.querySelector('.cards');
const cardTemplateElement = document.querySelector('#card-template').content;

const openPopup = popup => {
  popup.classList.add('popup_status_open');
  popup.classList.remove('popup_status_close');
}

const renderInputPopupProfileValue = () => {
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputVocationElement.value = profileVocationElement.textContent;
}

const openPopupProfile = () => {
  renderInputPopupProfileValue();
  openPopup(popupElementProfile);
}

const renderInputPopupCardValue = () => {
  popupInputTitleElement.value = '';
  popupInputLinkElement.value = '';
}

const openPopupCard = () => {
  renderInputPopupCardValue();
  openPopup(popupElementCard);
}

const closePopup = popup => {
  popup.classList.add('popup_status_close');
  popup.classList.remove('popup_status_open');
}

const closePopupProfile = () => {
  closePopup(popupElementProfile);
}

const closePopupCard = () => {
  closePopup(popupElementCard);
}

const closePopupPicture = () => {
  closePopup(popupElementPicture);
}

const handleFormSubmit = (evt, popup) => {
  evt.preventDefault();
  closePopup(popup);
}

const handleFormSubmitProfile = evt => {
  profileNameElement.textContent = popupInputNameElement.value;
  profileVocationElement.textContent = popupInputVocationElement.value;
  handleFormSubmit(evt, popupElementProfile);
}

const handleLikeButtonClick = evt => {
  evt.target.classList.toggle('card__like_active');
}

const handleTrashButtonClick = evt => {
  evt.target.closest('.card').remove();
}

const renderPopupPictureData = evt => {
  popupPictureImage.src = evt.target.src;
  popupPictureImage.alt = evt.target.closest('.card').querySelector('.card__name').textContent;
  popupPictureTitle.textContent = evt.target.closest('.card').querySelector('.card__name').textContent;
}

const openPopupPicture = evt => {
  renderPopupPictureData(evt)
  openPopup(popupElementPicture);
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

const renderCardElement = (card, element) => {
  element.prepend(createCardElement(card));
}

const handleFormSubmitCard = evt => {
  const inputCardObject = {};
  inputCardObject.name = popupInputTitleElement.value;
  inputCardObject.link = popupInputLinkElement.value;
  renderCardElement(inputCardObject, cardsListElement);
  handleFormSubmit(evt, popupElementCard); // Я вызываю такую же функцию выше, поэтому решил вывести ее в отдельную.
}

initialCards.forEach(card => {
  renderCardElement(card, cardsListElement);
});

popupOpenButtonProfile.addEventListener('click', openPopupProfile);
popupCloseButtonProfile.addEventListener('click', closePopupProfile);
popupFormElementProfile.addEventListener('submit', handleFormSubmitProfile);
popupOpenButtonCards.addEventListener('click', openPopupCard);
popupCloseButtonCards.addEventListener('click', closePopupCard);
popupFormElementCards.addEventListener('submit', handleFormSubmitCard);
popupCloseButtonPicture.addEventListener('click', closePopupPicture);
