import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".modal__form")
        this._handleFormSubmit = handleFormSubmit;
        this._inputs = this._popupForm.querySelectorAll('input');
    }

    _getInputValues() {
        const inputValues = {};

        this._inputs.forEach((element) => {
            inputValues[element.id] = element.value; 
        });

        return inputValues;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());
            
            this.close();
        });

        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}

export { PopupWithForm };