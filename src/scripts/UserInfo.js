export default class UserInfo {
  constructor({nameSelector, vocationSelector}) {
    this._infoName = document.querySelector(nameSelector).textContent;
    this._infoVocation = document.querySelector(vocationSelector).textContent;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._infoName;
    userInfo.vacation = this._infoVocation;

    return userInfo;
  }

  setUserInfo({name, vocation}) {
    this._infoName = name;
    this._infoVocation = vocation;
  }
}
