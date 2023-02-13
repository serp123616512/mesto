export default class Api {
  constructor({configApi}) {
    this._baseUrl = configApi.baseUrl;
    this._token = configApi.token;
  }

  _checkError(res) {
    return res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`)
  }

  getUserData() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
      authorization: this._token,
    }
    })
    .then(this._checkError)
  }

  getCardData() {
    return fetch(this._baseUrl + '/cards', {
      headers: {
      authorization: this._token,
    }
    })
    .then(this._checkError)
  }

  patchUserInfo({name, vocation}) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: vocation,
      })
    })
    .then(this._checkError)
  }

  postCard({name, link}) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
    .then(this._checkError)
  }

  putLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes ', {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkError)
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes ', {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkError)
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkError)
  }

  patchUserAvatar({avatar}) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then(this._checkError)
  }
}
