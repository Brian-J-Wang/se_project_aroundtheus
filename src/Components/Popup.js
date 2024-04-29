export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._popupCloseButton = this._popupElement.querySelector('.modal__close');
    }

    open() {
        this._popupElement.classList.add('modal_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('modal_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose() {
        if (EventTarget.key != 'Escape') {
            return;
        }

        this.close();
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('modal')) {
            this.close();
        }
    }

    _handleButtonClose(evt) {
        this.close();
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', this._handleOverlayClose);
        this._popupCloseButton.addEventListener('click', this._handleButtonClose);
    }
}