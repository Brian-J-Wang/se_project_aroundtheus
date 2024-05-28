export default class UserInfo {
    constructor({name, desc, avatar}) {
        this._name = document.querySelector(name);
        this._desc = document.querySelector(desc);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            desc: this._desc.textContent
        }
    }

    getAvatarInfo() {
        return this._avatar.getAttribute('src');
    }

    setUserInfo({name, desc}) {
        this._name.textContent = name;
        this._desc.textContent = desc;
    }

    setAvatarLink(link) {
        this._avatar.setAttribute('src', link);
    }
}