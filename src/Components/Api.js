export default class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }

    getUserInformation() {
        return this._request(this._url.concat("/users/me"),
        {
            method: "GET",
            headers: this._headers
        });
    }

    updateUserInformation({name, about}) {
        return this._request(this._url.concat("/users/me"),
        {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
    }

    updateAvatar(avatarLink) {
        return this._request(this._url.concat("/users/me/avatar"), 
        {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        });
    }

    getInitialCards() {
        return this._request(this._url.concat("/cards"), {
            method: "GET",
            headers: this._headers
        });
    }

    createCard({name, link}) {
        return this._request(this._url.concat("/cards"), {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        });
    }

    deleteCard(cardId) {
        return this._request(this._url.concat(`/cards/${cardId}`), {
            method: "DELETE",
            headers: this._headers
        });
    }

    addLike(cardId) {
        return this._request(this._url.concat(`/cards/${cardId}/likes`), {
            method: "PUT",
            headers: this._headers
        });
    }

    removeLike(cardId) {
        return this._request(this._url.concat(`/cards/${cardId}/likes`), {
            method: "DELETE",
            headers: this._headers
        });
    }

    handleError(res) {
        return Promise.reject(`Error: ${res.status}`)
        .catch(err => {
            console.error(err);
        })
    }
  
    // other methods for working with the API

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    }
  }
  
const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "e8616e37-d8e6-434f-880a-27a697920338",
      "Content-Type": "application/json"
    }
});

