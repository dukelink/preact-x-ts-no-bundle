var reactUnistore;
(function (reactUnistore) {
    const Component = preact.Component, h = preact.h;
    const createStore = unistore.createStore;
    const connect = unistore.connect;
    const Provider = unistore.Provider;
    const data = {
        characters: []
    };
    let store = createStore(data);
    let actions = store => ({
        removeCharacter: (state, index) => {
            const { characters } = state;
            return ({
                characters: characters.filter((character, i) => {
                    return i !== index;
                })
            });
        },
        handleSubmit: (state, character) => {
            return ({ characters: [...state.characters, character] });
        }
    });
    reactUnistore.App1 = connect('characters', actions)(({ characters, removeCharacter, handleSubmit }) => (h("div", null,
        h("h1", null, "React Unistore"),
        h("p", null, "Add a character with a name and a job to the table."),
        h(Table, { characterData: characters, removeCharacter: removeCharacter }),
        h("h3", null, "Add New"),
        h(Form, { handleSubmit: handleSubmit }))));
    class App extends Component {
        render() {
            return (h("div", null,
                h(DefaultApp, null)));
        }
    }
    reactUnistore.App = App;
    const DefaultApp = () => (h(Provider, { store: store },
        h(reactUnistore.App1, null)));
    class Form extends Component {
        constructor(props) {
            super(props);
            this.initialState = {
                name: '',
                job: ''
            };
            this.handleChange = event => {
                const { name, value } = event.target;
                const newState = { [name]: value };
                this.setState(newState);
            };
            this.onFormSubmit = (event) => {
                event.preventDefault();
                this.props.handleSubmit(this.state);
                this.setState(this.initialState);
            };
            this.state = this.initialState;
        }
        render() {
            const { name, job } = this.state;
            return (h("form", { onSubmit: this.onFormSubmit, class: "pure-form pure-form-aligned" },
                h("div", { class: "pure-control-group" },
                    h("label", null, "Name"),
                    h("input", { type: "text", name: "name", value: name, onChange: this.handleChange })),
                h("div", { class: "pure-control-group" },
                    h("label", null, "Job"),
                    h("input", { type: "text", name: "job", value: job, onChange: this.handleChange })),
                h("div", { class: "pure-controls" },
                    h("button", { type: "submit" }, "Submit"))));
        }
    }
    const TableHeader = () => {
        return (h("thead", null,
            h("tr", null,
                h("th", null, "Name"),
                h("th", null, "Job"),
                h("th", null, "Remove"))));
    };
    const TableBody = props => {
        const rows = props.characterData.map((row, index) => {
            return (h("tr", { key: index },
                h("td", null, row.name),
                h("td", null, row.job),
                h("td", null,
                    h("button", { onClick: () => props.removeCharacter(index) }, "Delete"))));
        });
        return h("tbody", null, rows);
    };
    class Table extends Component {
        render() {
            const { characterData, removeCharacter } = this.props;
            return (h("table", { class: 'pure-table pure-table-bordered' },
                h(TableHeader, null),
                h(TableBody, { characterData: characterData, removeCharacter: removeCharacter })));
        }
    }
})(reactUnistore || (reactUnistore = {}));
