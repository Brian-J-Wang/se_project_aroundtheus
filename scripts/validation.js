

//validation Enabler
function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault(); 
        });

        setEventListeners(formElement, config);
    });
}

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, config);

            toggleButtonState(inputList, buttonElement, config);
        }) 
    });

    toggleButtonState(inputList, buttonElement, config);
}

function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
}

function showInputError(formElement, inputElement, errorMessage, config) {
    inputElement.classList.add(config.inputErrorClass);

    const inputErrorSpanElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputErrorSpanElement.textContent = errorMessage;
    inputErrorSpanElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
    inputElement.classList.remove(config.inputErrorClass);

    const formErrorSpan = formElement.querySelector(`.${inputElement.id}-error`);
    formErrorSpan.textContent = "";
    formErrorSpan.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', '');
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled', '');
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

enableValidation({
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
});
