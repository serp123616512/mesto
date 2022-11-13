const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close');
const popupOpenButton = document.querySelector('.profile__edit-btn');

const togglePopupVisibility = function () {
  popupElement.classList.toggle('popup__open');
}

popupOpenButton.addEventListener('click', togglePopupVisibility);
popupCloseButton.addEventListener('click', togglePopupVisibility);

const popupFormElement = popupElement.querySelector('.popup__content');
const popupInputNameElement = popupFormElement.querySelector('#name');
const popupInputVocationElement = popupFormElement.querySelector('#vocation');

const profileNameElement = document.querySelector('.profile__name');
const profileVocationElement = document.querySelector('.profile__vocation');

popupInputNameElement.placeholder = profileNameElement.textContent;
popupInputVocationElement.placeholder = profileVocationElement.textContent;

const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputNameElement.value;
  profileVocationElement.textContent = popupInputVocationElement.value;
  togglePopupVisibility();
}

popupFormElement.addEventListener('submit', formSubmitHandler);
