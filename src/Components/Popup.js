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

    
    _handleEscClose = (evt) => {
        if (evt.key != 'Escape') {
            return;
        }

        this.close();
    }

    _handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('modal')) {
            this.close();
        }
    }

    _handleButtonClose = () => {
        this.close();
    }

    setEventListeners() {
        //close by overlay
        this._popupElement.addEventListener('mousedown', this._handleOverlayClose);

        //close by close button
        this._popupCloseButton.addEventListener('click', this._handleButtonClose);
    }
}