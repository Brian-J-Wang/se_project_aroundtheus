import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._popupSubmitButton = this._popupForm.querySelector('.modal__button');
        this._popupSubmitText = this._popupSubmitButton.textContent;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._popupSubmitButton.textContent = 'Deleting...';
            this._popupSubmitButton.setAttribute('disabled', '');

            this.onConfirm()
            .then(() => {
                this.close();
            })
            .catch(reject => {
                console.error(reject);
            })
            .finally(() => {
                this._popupSubmitButton.textContent = this._popupSubmitText;
                this._popupSubmitButton.removeAttribute('disabled', '');
            });
        });

        super.setEventListeners();
    }

    onPopupConfirm(onConfirm) {
        this.onConfirm = onConfirm;
        this.open();
    }    
}