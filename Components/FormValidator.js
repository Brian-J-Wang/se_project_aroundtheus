class FormValidator {
    constructor(formElement, config) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
    
                this._toggleButtonState();
            }) 
        });

        this._toggleButtonState();
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement)
        }
    }

    _showInputError(inputElement) {
        inputElement.classList.add(this._config.inputErrorClass);

        const inputErrorSpanElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputErrorSpanElement.textContent = inputElement.validationMessage;
        inputErrorSpanElement.classList.add(this._config.errorClass);
    }

    _hideInputError(inputElement) {
        inputElement.classList.remove(this._config.inputErrorClass);

        const formErrorSpan = this._formElement.querySelector(`.${inputElement.id}-error`);
        formErrorSpan.textContent = "";
        formErrorSpan.classList.remove(this._config.errorClass);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute('disabled', '');
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute('disabled', '');
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

   
}

export { FormValidator };