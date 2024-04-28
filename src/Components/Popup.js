class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {}

    close() {}

    _handleEscClose() {}

    setEventListeners() {}
}

class PopupWithImage extends Popup {
    open({name, link}) {
        // set the image's src and alt
        // set the caption's textContent

        super.open();
    }
}

class PopupWithForm extends Popup {
    constructor(popupSelector, callback) {
        //the popup selector and a callback function
    }

    _getInputValues() {

    }

    setEventListeners() {
        
    }
}

export { PopupWithForm, PopupWithImage };