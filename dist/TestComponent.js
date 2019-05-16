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
var myapp;
(function (myapp) {
    var Component = preact.Component;
    var h = preact.createElement;
    var TestComponent = (function (_super) {
        __extends(TestComponent, _super);
        function TestComponent(props) {
            var _this = _super.call(this, props) || this;
            _this.render = function (props, state) { return (h("div", null,
                h("h1", null, props.name),
                h("ul", null,
                    h("li", null,
                        "props:",
                        h("br", null),
                        JSON.stringify(props)),
                    h("li", null,
                        "state:",
                        h("br", null),
                        JSON.stringify(state))))); };
            _this.state = { name: props.name, status: "initial" };
            return _this;
        }
        TestComponent.prototype.componentDidMount = function () {
            var _this = this;
            setTimeout(function () {
                var state = _this.state;
                state.status = "componentDidMount() lifecycle event called.";
                _this.setState(state);
            }, 2000);
        };
        return TestComponent;
    }(Component));
    myapp.TestComponent = TestComponent;
})(myapp || (myapp = {}));
