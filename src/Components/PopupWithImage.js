import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._modalImage = this._popupElement.querySelector('.modal__image');
        this._modalCaption = this._popupElement.querySelector('.modal__caption');
    }


    open({name, link}) {
        this._modalImage.setAttribute('src', link);
        this._modalImage.setAttribute('alt', name);
        this._modalCaption.innerText = name;

        super.open();
    }
}