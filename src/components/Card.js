export default class Card {
  constructor({item, userId, handlePreviewPicture, handleTrashButtonClick, handleLikeButtonClick} , cardSelector) {
    this._id = item._id;
    this._likes = item.likes;
    this._ownerId = item.owner._id;
    this._name = item.name;
    this._link = item.link;
    this._userId = userId;
    this._cardTemplateElement = document.querySelector(cardSelector);
    this._handlePreviewPicture = handlePreviewPicture;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  _getTemplateElement() {
    const cardElement =  this._cardTemplateElement
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _isOwner() {
    if(this._ownerId === this._userId) {
      this._cardButtonTrashElement.classList.add('card__trash_active');
      this._cardButtonTrashElement.addEventListener('click', () => {
        this._handleTrashButtonClick(this._element);
      });
    }
  }

  isLiked() {
    return this._likes.find(owner => owner._id === this._userId)
  }

  updateLikes(length) {
    this._cardLikesNumber.textContent = length;
  }

  getCardElement() {
    this._element = this._getTemplateElement();

    this._cardButtonLikeElement = this._element.querySelector('.card__like');
    this._cardButtonTrashElement = this._element.querySelector('.card__trash');
    this._cardNameElement = this._element.querySelector('.card__name');
    this._cardPictureElement = this._element.querySelector('.card__pic');
    this._cardLikesNumber = this._element.querySelector('.card__likes-number');

    this._isOwner();

    if(this.isLiked()) {
      this._cardButtonLikeElement.classList.add('card__like_active');
    };

    this._setEventListeners();

    this._cardNameElement.textContent = this._name;
    this._cardPictureElement.src = this._link;
    this._cardPictureElement.alt = this._name;
    this.updateLikes(this._likes.length);

    return this._element;
  }

  _setEventListeners() {
    this._cardButtonLikeElement.addEventListener('click', () => {
      this._handleLikeButtonClick(this._id)
      .then(res => {
        this._cardButtonLikeElement.classList.toggle('card__like_active');
        this.updateLikes(res.likes.length);
        this._likes = res.likes;
      })
      .catch(console.log);
    });
    this._cardPictureElement.addEventListener('click', () => {
      this._handlePreviewPicture(this._link, this._name);
    });
  }
}
