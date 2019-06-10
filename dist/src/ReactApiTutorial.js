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
var reactApiTutorial;
(function (reactApiTutorial) {
    var Component = preact.Component, h = preact.h;
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                data: []
            };
            return _this;
        }
        App.prototype.componentDidMount = function () {
            var _this = this;
            var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*&limit=1";
            fetch(url)
                .then(function (result) { return result.json(); })
                .then(function (result) {
                _this.setState({
                    data: result
                });
            });
        };
        App.prototype.render = function () {
            var data = this.state.data;
            var result = data.map(function (entry, index) {
                console.log(entry);
                return h("li", { key: index }, entry);
            });
            return h("div", { className: "container" },
                h("ul", null, result));
        };
        return App;
    }(Component));
    reactApiTutorial.App = App;
})(reactApiTutorial || (reactApiTutorial = {}));
