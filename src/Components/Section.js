export default class Section {
    //items: array, renderer: function
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach(element => {
            this._renderer(element, this._container);
        });
    }

    addItem(element) {
        this._renderer(element, this._container);
    }
}