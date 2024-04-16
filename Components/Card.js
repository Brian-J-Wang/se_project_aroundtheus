class Card {
    constructor(data, cardTemplate, handleImageClick) {
        this._data = data;
        this._cardTemplate = cardTemplate;
        this._cardElement = this._cardTemplate.content.cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.places__image');
        this._deleteButton = this._cardElement.querySelector('.places__delete');
        this._heartButton = this._cardElement.querySelector('.places__heart');
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
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick(this._cardImage);
        });
    }

    _setDeleteHandler(cardCopy) {
        this._deleteButton.addEventListener("click", () => {
            this._deleteButton.closest('.places__card').remove();
        });
    }

    _setLikeHandler(cardCopy) {
        this._heartButton.addEventListener("click", () => {
            this._heartButton.classList.toggle('places__heart_enabled');
        });
    }
}

export { Card };