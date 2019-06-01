var stencilWC;
(function (stencilWC) {
    const h = preact.h;
    const Component = preact.Component;
    class myDropdown extends Component {
        constructor() {
            super();
            this.items = [
                {
                    label: 'Spiderman',
                    publisher: 'Marvel'
                },
                {
                    label: 'Batman',
                    publisher: 'DC'
                },
                {
                    label: 'Saga',
                    publisher: 'Image Comics'
                },
                {
                    label: 'Hellboy',
                    publisher: 'Dark Horse Comics'
                }
            ];
            this.render = (props, state) => {
                return (h("div", null,
                    h("h1", null, "Stencil Custom Element"),
                    h("p", null, JSON.stringify(this.state)),
                    h("hr", null),
                    h("label", null,
                        "Add new list item:",
                        h("input", { type: "text", onChange: (e) => {
                                let targ;
                                targ = e.target;
                                state.items.push({ label: targ.value, publisher: '' });
                                this.setState(state);
                                targ.value = '';
                            } })),
                    h("hr", null),
                    h("p", null,
                        h("my-dropdown", { "data-no-work-clickedItem": (e) => alert(e) },
                            " ",
                            h("label", { slot: "title" }, "Comics"),
                            h("span", { slot: "icon", class: "fas fa-caret-down" })))));
            };
            this.state = { items: this.items };
        }
        componentDidMount() {
            const el = document.querySelector('my-dropdown');
            el.listItems = this.items;
            el.addEventListener('clickedItem', (event) => {
                alert(event);
            });
        }
    }
    stencilWC.myDropdown = myDropdown;
})(stencilWC || (stencilWC = {}));
