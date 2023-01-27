export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = super._popup.querySelector('.popup__content');
    this._inpotList = super._popup.querySelectorAll('.popup__input-text');
  }

  _getInputValues() {
    this._values = {};
    this._inpotList.forEach(input => {
      this._values[input.id] = input.value;
    })

    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    super._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      super.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
