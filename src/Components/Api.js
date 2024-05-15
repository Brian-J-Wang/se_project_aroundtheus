class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }

    getUserInformation() {
        return fetch(this._url.concat("users/me"), {
            method: "GET",
            headers: this._headers
        })
        .then (res => {
            if (res.ok) {
                return res.json();
            } else {
                return this.handleError(res);
            }
        })
    }

    updateProfileInformation(profileInfo) {
        return fetch(this._url.concat("users/me"), {
            method: "PATCH",
            headers: this._headers,
            body: json.stringify(profileInfo)
        })
        .then (res => {
            if (res.ok) {
                return res.json();
            } else {
                return this.handleError(res);
            }
        })
    }

    updateAvatar(avatarLink) {
        return fetch(this._url.concat("users/me/avatar"), {
            method: "PATCH",
            headers: this._headers,
            body: json.stringify(avatarLink)
        })
    }

    getInitialCards() {
        return fetch(this._url.concat("cards"), {
          method: "GET",
          headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return this.handleError(res);
            }
        })
    }

    createCard() {
        return 
    }

    handleError(res) {
        return Promise.reject(`Error: ${res.status}`)
        .catch(err => {
            console.error(err);
        })
    }
  
    // other methods for working with the API
  }
  
const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "e8616e37-d8e6-434f-880a-27a697920338",
      "Content-Type": "application/json"
    }
});

