class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._data = data;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    createCard() {
        const cardCopy = this._cardSelector.content.cloneNode(true);
        const cardImage = cardCopy.querySelector(".places__image");
        cardImage.src = this._data.link;
        cardImage.alt = this._data.name;

        cardCopy.querySelector('.places__name').textContent = this._data.name;

        this._setEventListeners(cardCopy);

        return cardCopy;
    }

    _setEventListeners(cardCopy) {

        this._setDeleteHandler(cardCopy);
        this._setLikeHandler(cardCopy);

        const cardImage = cardCopy.querySelector('.places__image');
        cardImage.addEventListener('click', () => {
            this._handleImageClick(cardImage);
        });
    }

    _setDeleteHandler(cardCopy) {
        const deleteButton = cardCopy.querySelector('.places__delete');
        deleteButton.addEventListener("click", () => {
            deleteButton.closest('.places__card').remove();
        });
    }

    _setLikeHandler(cardCopy) {
        const heartButton = cardCopy.querySelector('.places__heart');
        heartButton.addEventListener("click", () => {
            heartButton.classList.toggle('places__heart_enabled');
        });
    }
}

export { Card };