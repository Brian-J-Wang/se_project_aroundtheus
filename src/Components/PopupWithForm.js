import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".modal__form")
        this._handleFormSubmit = handleFormSubmit;
        this._inputs = this._getInputValues();

    }

    _getInputValues() {
        const inputs = {};

        this._popupForm.querySelectorAll('input').forEach((element) => {
            inputs[element.id] = element; 
        });

        return inputs;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._inputs);

            this.close();
        });

        
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}

export { PopupWithForm };