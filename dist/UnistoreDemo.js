var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var UnistoreDemo;
(function (UnistoreDemo) {
    const Component = preact.Component, h = preact.h;
    const createStore = unistore.createStore;
    const connect = unistore.connect;
    const Provider = unistore.Provider;
    const data = { count: 0 };
    let store = createStore(data);
    let actions = store => ({
        increment(state) {
            return { count: state.count + 1 };
        },
        increment2: ({ count }) => ({ count: count + 1 }),
        incrementAndLog: (state, event) => {
            const { count } = state;
            console.info(event);
            console.log(data);
            console.log(state);
            return { count: count + 1 };
        },
        getStuff(state) {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield fetch('/foo.json');
                return { stuff: yield res.json() };
            });
        },
        incrementAsync(state) {
            console.log(new Date());
            console.log(state);
            setTimeout(() => {
                store.setState({ count: state.count + 1 });
            }, 1000);
        }
    });
    const App1 = connect('count', actions)(({ count, incrementAndLog, increment2, incrementAsync }) => (h("div", null,
        h("p", null,
            "Count: ",
            count,
            " (direc state update)"),
        h("button", { onClick: incrementAndLog }, "Increment"),
        h("p", null,
            "Count: ",
            count,
            " (delayed setState)"),
        h("button", { onClick: increment2 }, "Increment 2"),
        h("p", null,
            "Count: ",
            count,
            " (delayed setState)"),
        h("button", { onClick: incrementAsync }, "Increment Async - 1 second delay"))));
    class App extends Component {
        render() {
            return (h("div", null,
                h(DefaultApp, null)));
        }
    }
    UnistoreDemo.App = App;
    const DefaultApp = () => (h(Provider, { store: store },
        h(App1, null)));
})(UnistoreDemo || (UnistoreDemo = {}));
