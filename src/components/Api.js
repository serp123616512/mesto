export default class Api {
  constructor({configApi}) {
    this._baseUrl = configApi.baseUrl;
    this._token = configApi.token;
  }

  getUserData() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
      authorization: this._token,
    }
    })
    .then(res => res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`))
  }

  getCardData() {
    return fetch(this._baseUrl + '/cards', {
      headers: {
      authorization: this._token,
    }
    })
    .then(res => res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`))
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
    .then(res => res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`))
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
    .then(res => res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`))
  }

  putLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes ', {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`))
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes ', {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`))
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`))
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
    .then(res => res.ok ? res.json(): Promise.reject(`Ошибка ${res.status}`))
  }
}
