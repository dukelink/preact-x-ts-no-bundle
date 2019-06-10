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
var reactHooks;
(function (reactHooks) {
    var Component = preact.Component, h = preact.h;
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                characters: []
            };
            _this.removeCharacter = function (index) {
                var characters = _this.state.characters;
                _this.setState({
                    characters: characters.filter(function (character, i) {
                        return i !== index;
                    })
                });
            };
            _this.handleSubmit = function (character) {
                _this.setState({ characters: _this.state.characters.concat([character]) });
            };
            return _this;
        }
        App.prototype.render = function () {
            var characters = this.state.characters;
            return (h("div", { class: 'pure-g' },
                h("div", { class: 'pure-u-1-5' }),
                h("div", { class: 'pure-u-3-5' },
                    h("h1", null, "React Tutorial"),
                    h("p", null, "Add a character with a name and a job to the table."),
                    h(Form, { handleSubmit: this.handleSubmit }),
                    h(Table, { characterData: characters, removeCharacter: this.removeCharacter }))));
        };
        return App;
    }(Component));
    reactHooks.App = App;
    var Form = (function (_super) {
        __extends(Form, _super);
        function Form(props) {
            var _this = _super.call(this, props) || this;
            _this.initialState = {
                name: '',
                job: ''
            };
            _this.handleChange = function (event) {
                var _a;
                var _b = event.target, name = _b.name, value = _b.value;
                var newState = (_a = {}, _a[name] = value, _a);
                _this.setState(newState);
            };
            _this.onFormSubmit = function (event) {
                event.preventDefault();
                _this.props.handleSubmit(_this.state);
                _this.setState(_this.initialState);
            };
            _this.state = _this.initialState;
            return _this;
        }
        Form.prototype.render = function () {
            var _a = this.state, name = _a.name, job = _a.job;
            return (h("form", { onSubmit: this.onFormSubmit, class: "pure-form pure-form-aligned" },
                h("div", { class: "pure-control-group" },
                    h("label", null, "Name"),
                    h("input", { type: "text", name: "name", value: name, onChange: this.handleChange })),
                h("div", { class: "pure-control-group" },
                    h("label", null, "Job"),
                    h("input", { type: "text", name: "job", value: job, onChange: this.handleChange })),
                h("div", { class: "pure-controls" },
                    h("button", { type: "submit", style: { backgroundColor: "ivory" } }, "Submit"))));
        };
        return Form;
    }(Component));
    var TableHeader = function () {
        return (h("thead", null,
            h("tr", null,
                h("th", null, "Name"),
                h("th", null, "Job"),
                h("th", null, "Remove"))));
    };
    var TableBody = function (props) {
        var rows = props.characterData.map(function (row, index) {
            return (h("tr", { key: index },
                h("td", null, row.name),
                h("td", null, row.job),
                h("td", null,
                    h("button", { onClick: function () { return props.removeCharacter(index); } }, "Delete"))));
        });
        return h("tbody", null, rows);
    };
    var Table = (function (_super) {
        __extends(Table, _super);
        function Table() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Table.prototype.render = function () {
            var _a = this.props, characterData = _a.characterData, removeCharacter = _a.removeCharacter;
            return (!characterData.length ? '' :
                h("div", null,
                    h("br", null),
                    h("hr", null),
                    h("table", { class: 'pure-table pure-table-bordered' },
                        h(TableHeader, null),
                        h(TableBody, { characterData: characterData, removeCharacter: removeCharacter }))));
        };
        return Table;
    }(Component));
})(reactHooks || (reactHooks = {}));
