class Card {
    constructor(data, cardTemplate, handleImageClick, handleImageRemove, handleImageLike) {
        this._data = data;
        this._cardTemplate = cardTemplate;
        this._cardElement = this._cardTemplate.content.cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.places__image');
        this._deleteButton = this._cardElement.querySelector('.places__delete');
        this._heartButton = this._cardElement.querySelector('.places__heart');
        this._handleImageClick = handleImageClick;
        this._handleImageRemove = handleImageRemove;
        this._handleImageLike = handleImageLike;
    }

    createCard() {
        this._cardImage.src = this._data.link;
        this._cardImage.alt = this._data.name;

        this._cardElement.querySelector('.places__name').textContent = this._data.name;

        if (this._data.isLiked) {
            this._heartButton.classList.add('places__heart_enabled');
        }

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
            this._handleImageRemove(this._data, this._deleteButton);
        });
    }

    _setLikeHandler(cardCopy) {
        this._heartButton.addEventListener("click", () => {
            this._handleImageLike(this._data)
            .then(() => {
                if (this._data.isLiked) {
                    this._heartButton.classList.add('places__heart_enabled');
                } else {
                    this._heartButton.classList.remove('places__heart_enabled');
                }
            })
            .catch(rej => {
                console.log(rej);
            });
        });
    }
}

export { Card };