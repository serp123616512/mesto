const popupPictureElement = document.querySelector('#picture');
const popupPictureImageElement = popupPictureElement.querySelector('.popup__pic');
const popupPictureTitleElement = popupPictureElement.querySelector('.popup__title');

export class Card {
  constructor(card) {
    this._name = card.name;
    this._link = card.link;
  }

  _getTemplateElement() {
    const cardElement = document.querySelector('#card-template').content.cloneNode(true);
    return cardElement;
  }

  getCardElement() {
    this._element = this._getTemplateElement();

    this._setEventListeners();

    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__pic').src = this._link;
    this._element.querySelector('.card__pic').alt = this._name;

    return this._element;
  }

  _handleLikeButtonClick() {
    console.log('!!!');
    console.log(this._element);
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  //_handleTrashButtonClick() {
  //  console.log('!!');
  //  this._element.remove();
    //this._element = null;
  //}

  _setEventListeners() {
    console.log('!');
    console.log(this._element);
    this._element.querySelector('.card__like').addEventListener('click', () => {
      console.log('!!');
      console.log(this._element);
      this._handleLikeButtonClick();
    });
   // this._element.querySelector('.card__trash').addEventListener('click', () => {
   //   this._handleTrashButtonClick()
   // });
   // this._element.querySelector('.card__pic').addEventListener('click', () => {
   //   this._openPopupPictureElement();
   // });
  }



  //_openPopupPictureElement() {
  //  popupPictureElement.classList.add('popup_opened');
  //  popupPictureImageElement.src = this._link;;
  //  popupPictureImageElement.alt = this._name;
  //  popupPictureTitleElement.textContent = this._name;
  //  document.addEventListener('keydown', () => {
  //    this._closePopupByClickOnEscape;
  //  });
  //}
}
