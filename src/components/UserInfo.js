export default class UserInfo {
  constructor({nameSelector, vocationSelector}) {
    this._infoName = document.querySelector(nameSelector);
    this._infoVocation = document.querySelector(vocationSelector);
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
}
