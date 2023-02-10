export default class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renerItems(items, {userId}) {
    items.reverse().forEach(item => this._renderer(item, {userId}))
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml)
  }
}
