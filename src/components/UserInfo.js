export default class UserInfo {
  constructor({nameSelector, vocationSelector, avatarSelector}) {
    this._infoName = document.querySelector(nameSelector);
    this._infoVocation = document.querySelector(vocationSelector);
    this._infoAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._infoName.textContent;
    userInfo.vocation = this._infoVocation.textContent;

    return userInfo;
  }

  setUserInfo({name, vocation}) {
    this._infoName.textContent = name;
    this._infoVocation.textContent = vocation;
  }

  setUserAvatar({avatar}) {
    this._infoAvatar.src = avatar;
  }

  getUserId({id}) {
    this.id = id;
  }
}
