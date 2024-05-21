export default class UserInfo {
    constructor({name, desc}) {
        this._name = document.querySelector(name);
        this._desc = document.querySelector(desc);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            desc: this._desc.textContent,
        }
    }

    setUserInfo({name, desc}) {
        this._name.textContent = name;
        this._desc.textContent = desc;
    }
}