const profileNameElement = document.querySelector('.profile__name');
const profileVocationElement = document.querySelector('.profile__vocation');
const popupOpenButton = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close');
const popupFormElement = popupElement.querySelector('.popup__content');
const popupInputNameElement = popupFormElement.querySelector('#name');
const popupInputVocationElement = popupFormElement.querySelector('#vocation');

const togglePopupVisibility = function () {
  popupElement.classList.toggle('popup__open');
  popupInputNameElement.placeholder = profileNameElement.textContent;
  popupInputVocationElement.placeholder = profileVocationElement.textContent;
  popupInputNameElement.value = '';
  popupInputVocationElement.value = '';
}

const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputNameElement.value;
  profileVocationElement.textContent = popupInputVocationElement.value;
  togglePopupVisibility();
}

popupOpenButton.addEventListener('click', togglePopupVisibility);
popupCloseButton.addEventListener('click', togglePopupVisibility);
popupFormElement.addEventListener('submit', formSubmitHandler);
