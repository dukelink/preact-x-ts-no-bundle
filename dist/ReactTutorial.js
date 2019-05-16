var reactTutorial;
(function (reactTutorial) {
    const Component = preact.Component, h = preact.h;
    class App extends Component {
        constructor() {
            super(...arguments);
            this.state = {
                characters: []
            };
            this.removeCharacter = index => {
                const { characters } = this.state;
                this.setState({
                    characters: characters.filter((character, i) => {
                        return i !== index;
                    })
                });
            };
            this.handleSubmit = character => {
                this.setState({ characters: [...this.state.characters, character] });
            };
        }
        render() {
            const { characters } = this.state;
            return (h("div", { className: "container" },
                h("h1", null, "React Tutorial"),
                h("p", null, "Add a character with a name and a job to the table."),
                h(Table, { characterData: characters, removeCharacter: this.removeCharacter }),
                h("h3", null, "Add New"),
                h(Form, { handleSubmit: this.handleSubmit })));
        }
    }
    reactTutorial.App = App;
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
            return (h("form", { onSubmit: this.onFormSubmit },
                h("label", null, "Name"),
                h("input", { type: "text", name: "name", value: name, onChange: this.handleChange }),
                h("label", null, "Job"),
                h("input", { type: "text", name: "job", value: job, onChange: this.handleChange }),
                h("button", { type: "submit" }, "Submit")));
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
            return (h("table", null,
                h(TableHeader, null),
                h(TableBody, { characterData: characterData, removeCharacter: removeCharacter })));
        }
    }
})(reactTutorial || (reactTutorial = {}));
