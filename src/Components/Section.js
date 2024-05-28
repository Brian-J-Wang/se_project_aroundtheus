export default class Section {
    //items: array, renderer: function
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems(items) {
        items.forEach(element => {
            const cardElement = this._renderer(element);
            this._container.append(cardElement);
        });
    } 
}