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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var hookStore;
(function (hookStore) {
    function setState(newState) {
        var _this = this;
        this.state = __assign({}, this.state, newState);
        this.listeners.forEach(function (listener) {
            listener(_this.state);
        });
    }
    function useCustom(React) {
        var _this = this;
        var newListener = React.useState()[1];
        React.useEffect(function () {
            _this.listeners.push(newListener);
            return function () {
                _this.listeners = _this.listeners.filter(function (listener) { return listener !== newListener; });
            };
        }, []);
        return [this.state, this.actions];
    }
    function associateActions(store, actions) {
        var associatedActions = {};
        Object.keys(actions).forEach(function (key) {
            if (typeof actions[key] === 'function')
                associatedActions[key] = actions[key].bind(null, store);
            if (typeof actions[key] === 'object')
                associatedActions[key] = associateActions(store, actions[key]);
        });
        return associatedActions;
    }
    hookStore.useStore = function (initialState, actions, initializer) {
        var store = { state: initialState, listeners: [] };
        store["setState"] = setState.bind(store);
        store["actions"] = associateActions(store, actions);
        if (initializer)
            initializer(store);
        return useCustom.bind(store, preactHooks);
    };
})(hookStore || (hookStore = {}));
var reactHooks;
(function (reactHooks) {
    var Component = preact.Component, h = preact.h, useState = preactHooks.useState;
    var useStore = hookStore.useStore;
    var initialState = {
        count: 0,
    };
    var actions = {
        addToCounter: function (_a, amount) {
            var state = _a.state, setState = _a.setState;
            var newCounterValue = state.count + amount;
            setState({ count: newCounterValue });
        },
    };
    var useGlobal = useStore(initialState, actions);
    reactHooks.Example = function () {
        var _a = useGlobal(), globalState = _a[0], globalActions = _a[1];
        return (h("div", null,
            h("p", null,
                "You clicked ",
                globalState.count,
                " times"),
            h("button", { onClick: function () { return globalActions.addToCounter(1); } }, "Click me")));
    };
    var initialState2 = {
        characters: []
    };
    for (var i = 1; i < 5; i++)
        initialState2.characters.push({ name: 'name_' + i, job: i });
    var actions2 = {
        removeCharacter: function (_a, index) {
            var state = _a.state, setState = _a.setState;
            var characters = state.characters;
            setState({
                characters: characters.filter(function (character, i) {
                    return i !== index;
                })
            });
        },
        handleSubmit: function (_a, character) {
            var state = _a.state, setState = _a.setState;
            setState({ characters: state.characters.concat([character]) });
        }
    };
    var useGlobal2 = useStore(initialState2, actions2);
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            var _a = useGlobal2(), globalState = _a[0], globalActions = _a[1];
            return (h("div", { class: 'pure-g' },
                h("div", { class: 'pure-u-1-5' }),
                h("div", { class: 'pure-u-3-5' },
                    h("h1", null, "React Tutorial"),
                    h("hr", null),
                    h(reactHooks.Example, null),
                    h("hr", null),
                    h("p", null, "Add a character with a name and a job to the table."),
                    h(Form, { handleSubmit: globalActions.handleSubmit }),
                    h(CharacterTable, { characterData: globalState.characters, removeCharacter: globalActions.removeCharacter }))));
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
    var CharacterTbody = function (props) {
        var rows = props.characterData.map(function (row, index) {
            return (h("tr", { key: index },
                h("td", null, row.name),
                h("td", null, row.job),
                h("td", null,
                    h("button", { onClick: function () { return props.removeCharacter(index); } }, "Delete"))));
        });
        return h("tbody", null, rows);
    };
    var CharacterTable = (function (_super) {
        __extends(CharacterTable, _super);
        function CharacterTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CharacterTable.prototype.render = function () {
            var _a = this.props, characterData = _a.characterData, removeCharacter = _a.removeCharacter;
            return (!characterData.length ? '' :
                h("div", null,
                    h("br", null),
                    h("hr", null),
                    h(Table, { class: 'pure-table pure-table-bordered' },
                        h(TableHeader, null),
                        h(CharacterTbody, { characterData: characterData, removeCharacter: removeCharacter }))));
        };
        return CharacterTable;
    }(Component));
    var Table = function (props) { return (h("table", { class: props.class },
        props.children.filter(function (x) {
            console.log(x);
            return x.type == CharacterTbody;
        }),
        props.children.filter(function (x) {
            console.log(x);
            return x.type != CharacterTbody;
        }))); };
})(reactHooks || (reactHooks = {}));
