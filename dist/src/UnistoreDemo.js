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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var UnistoreDemo;
(function (UnistoreDemo) {
    var Component = preact.Component, h = preact.h;
    var createStore = unistore.createStore;
    var connect = unistore.connect;
    var Provider = unistore.Provider;
    var data = { count: 0 };
    var store = createStore(data);
    var actions = function (store) { return ({
        increment: function (state) {
            return { count: state.count + 1 };
        },
        increment2: function (_a) {
            var count = _a.count;
            return ({ count: count + 1 });
        },
        incrementAndLog: function (state, event) {
            var count = state.count;
            console.info(event);
            console.log(data);
            console.log(state);
            return { count: count + 1 };
        },
        getStuff: function (state) {
            return __awaiter(this, void 0, void 0, function () {
                var res, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, fetch('/foo.json')];
                        case 1:
                            res = _b.sent();
                            _a = {};
                            return [4, res.json()];
                        case 2: return [2, (_a.stuff = _b.sent(), _a)];
                    }
                });
            });
        },
        incrementAsync: function (state) {
            console.log(new Date());
            console.log(state);
            setTimeout(function () {
                store.setState({ count: state.count + 1 });
            }, 1000);
        }
    }); };
    var App1 = connect('count', actions)(function (_a) {
        var count = _a.count, incrementAndLog = _a.incrementAndLog, increment2 = _a.increment2, incrementAsync = _a.incrementAsync;
        return (h("div", null,
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
            h("button", { onClick: incrementAsync }, "Increment Async - 1 second delay")));
    });
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            return (h("div", null,
                h(DefaultApp, null)));
        };
        return App;
    }(Component));
    UnistoreDemo.App = App;
    var DefaultApp = function () { return (h(Provider, { store: store },
        h(App1, null))); };
})(UnistoreDemo || (UnistoreDemo = {}));
