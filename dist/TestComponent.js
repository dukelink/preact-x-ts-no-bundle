var myapp;
(function (myapp) {
    const Component = preact.Component;
    const h = preact.h;
    class TestComponent extends Component {
        constructor(props) {
            super(props);
            this.render = (props, state) => (h("div", null,
                h("h1", null, props.name),
                h("ul", null,
                    h("li", null,
                        "props:",
                        h("br", null),
                        JSON.stringify(props)),
                    h("li", null,
                        "state:",
                        h("br", null),
                        JSON.stringify(state)))));
            this.state = { name: props.name, status: "initial" };
        }
        componentDidMount() {
            setTimeout(() => {
                var state = this.state;
                state.status = "componentDidMount() lifecycle event called.";
                this.setState(state);
            }, 2000);
        }
    }
    myapp.TestComponent = TestComponent;
})(myapp || (myapp = {}));
