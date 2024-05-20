import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".modal__form");
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this.onConfirm();

            this.close();
        });

        super.setEventListeners();
    }

    onPopupConfirm(onConfirm) {
        this.onConfirm = onConfirm;
        this.open();
    }    
}