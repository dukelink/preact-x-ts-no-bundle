var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var stencilWC;
(function (stencilWC) {
    var h = preact.h;
    var Component = preact.Component;
    var myDropdown = (function (_super) {
        __extends(myDropdown, _super);
        function myDropdown() {
            var _this = _super.call(this) || this;
            _this.items = [
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
            _this.render = function (props, state) {
                return (h("div", null,
                    h("h1", null, "Stencil Custom Element"),
                    h("p", null, JSON.stringify(_this.state)),
                    h("hr", null),
                    h("label", null,
                        "Add new list item:",
                        h("input", { type: "text", onChange: function (e) {
                                var targ;
                                targ = e.target;
                                state.items.push({ label: targ.value, publisher: '' });
                                _this.setState(state);
                                targ.value = '';
                            } })),
                    h("hr", null),
                    h("p", null,
                        h("my-dropdown", { "data-no-work-clickedItem": function (e) { return alert(e); } },
                            " ",
                            h("label", { slot: "title" }, "Comics"),
                            h("span", { slot: "icon", class: "fas fa-caret-down" })))));
            };
            _this.state = { items: _this.items };
            return _this;
        }
        myDropdown.prototype.componentDidMount = function () {
            var el = document.querySelector('my-dropdown');
            el.listItems = this.items;
            el.addEventListener('clickedItem', function (event) {
                alert(event);
            });
        };
        return myDropdown;
    }(Component));
    stencilWC.myDropdown = myDropdown;
})(stencilWC || (stencilWC = {}));
