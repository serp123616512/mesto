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
    if(name) this._infoName.textContent = name;
    if(vocation) this._infoVocation.textContent = vocation;
  }

  setUserAvatar({avatar}) {
    if(avatar) this._infoAvatar.src = avatar;
  }
}
