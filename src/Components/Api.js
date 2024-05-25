export default class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }

    getUserInformation() {
        return fetch(this._url.concat("/users/me"), {
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

    updateUserInformation({name, about}) {
        return fetch(this._url.concat("/users/me"), {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
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
        return fetch(this._url.concat("/users/me/avatar"), {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
        .then (res => {
            if (res.ok) {
                return res.json();
            } else {
                return this.handleError(res);
            }
        });
    }

    getInitialCards() {
        return fetch(this._url.concat("/cards"), {
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

    createCard({name, link}) {
        return fetch(this._url.concat("/cards"), {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return this.handleError(res);
            }
        })
    }

    deleteCard(cardId) {
        return fetch(this._url.concat(`/cards/${cardId}`), {
            method: "DELETE",
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

    addLike(cardId) {
        return fetch(this._url.concat(`/cards/${cardId}/likes`), {
            method: "PUT",
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

    removeLike(cardId) {
        return fetch(this._url.concat(`/cards/${cardId}/likes`), {
            method: "DELETE",
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

