var reactApiTutorial;
(function (reactApiTutorial) {
    const Component = preact.Component, h = preact.h;
    class App extends Component {
        constructor() {
            super(...arguments);
            this.state = {
                data: []
            };
        }
        componentDidMount() {
            const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*&limit=1";
            fetch(url)
                .then(result => result.json())
                .then(result => {
                this.setState({
                    data: result
                });
            });
        }
        render() {
            const { data } = this.state;
            const result = data.map((entry, index) => {
                console.log(entry);
                return h("li", { key: index }, entry);
            });
            return h("div", { className: "container" },
                h("ul", null, result));
        }
    }
    reactApiTutorial.App = App;
})(reactApiTutorial || (reactApiTutorial = {}));
