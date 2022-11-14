const profileNameElement = document.querySelector('.profile__name');
const profileVocationElement = document.querySelector('.profile__vocation');
const popupOpenButton = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close');
const popupFormElement = popupElement.querySelector('.popup__content');
const popupInputNameElement = popupFormElement.querySelector('#name');
const popupInputVocationElement = popupFormElement.querySelector('#vocation');

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

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popupFormElement.addEventListener('submit', formSubmitHandler);
