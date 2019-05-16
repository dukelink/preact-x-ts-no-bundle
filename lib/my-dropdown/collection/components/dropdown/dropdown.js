export class Dropdown {
    constructor() {
        this.toggle = false;
        this.handleClick = (item) => {
            this.selectedItem = item;
            this.toggle = !this.toggle;
            this.clickedItem.emit(item);
        };
        this.toggleList = () => {
            this.toggle = !this.toggle;
        };
    }
    render() {
        return (h("div", { class: "dropdown" },
            h("header", { class: "dropdown__header", onClick: this.toggleList },
                this.selectedItem
                    ? h("label", null, this.selectedItem.label)
                    : h("slot", { name: "title" }, "Default Header"),
                h("slot", { name: "icon" })),
            this.toggle &&
                h("ul", { class: "dropdown__list" }, this.listItems.map((item) => (h("li", { class: "dropdown__item", onClick: () => this.handleClick(item) }, item.label))))));
    }
    static get is() { return "my-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "listItems": {
            "type": "Any",
            "attr": "list-items"
        },
        "selectedItem": {
            "state": true
        },
        "toggle": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "clickedItem",
            "method": "clickedItem",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:my-dropdown:**/"; }
}
