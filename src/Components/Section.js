export default class Section {
    //items: array, renderer: function
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._items.forEach(element => {
            const cardElement = this._renderer(element);
            this.addItem(cardElement);
        });
    } 
}