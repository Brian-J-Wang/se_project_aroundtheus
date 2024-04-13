class Card {
    constructor(data, cardTemplate, handleImageClick) {
        this._data = data;
        this._cardTemplate = cardTemplate;
        this._cardElement = this._cardTemplate.content.cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.places__image');
        this._handleImageClick = handleImageClick;
    }

    createCard() {
        this._cardImage.src = this._data.link;
        this._cardImage.alt = this._data.name;

        this._cardElement.querySelector('.places__name').textContent = this._data.name;

        this._setEventListeners();

        return this._cardElement;
    }

    _setEventListeners() {

        this._setDeleteHandler();
        this._setLikeHandler();

        const cardImage = this._cardElement.querySelector('.places__image');
        cardImage.addEventListener('click', () => {
            this._handleImageClick(cardImage);
        });
    }

    _setDeleteHandler(cardCopy) {
        const deleteButton = this._cardElement.querySelector('.places__delete');
        deleteButton.addEventListener("click", () => {
            deleteButton.closest('.places__card').remove();
        });
    }

    _setLikeHandler(cardCopy) {
        const heartButton = this._cardElement.querySelector('.places__heart');
        heartButton.addEventListener("click", () => {
            heartButton.classList.toggle('places__heart_enabled');
        });
    }
}

export { Card };