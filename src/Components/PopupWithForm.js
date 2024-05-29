import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, onFormClose = () => {}) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._popupSubmitButton = this._popupForm.querySelector('.modal__button');
        this._popupSubmitText = this._popupSubmitButton.textContent;
        this._handleFormSubmit = handleFormSubmit;
        this._onFormClose = onFormClose;
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

            this._popupSubmitButton.textContent = 'Saving...';
            this._popupSubmitButton.setAttribute('disabled', '');
            this._handleFormSubmit(this._getInputValues())
            .then(() => {
                this._popupSubmitButton.textContent = this._popupSubmitText;
                this._popupSubmitButton.removeAttribute('disabled', '');
                this.close();
            })
            .catch(reject => {
                console.error(reject);
            });
        });

        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        this._onFormClose();
        super.close();
    }
}

export { PopupWithForm };