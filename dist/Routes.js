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
var myRoutes;
(function (myRoutes) {
    var Component = preact.Component, h = preact.h, Router = preactRouter;
    var MainRoutes = (function (_super) {
        __extends(MainRoutes, _super);
        function MainRoutes() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.render = function () { return (h(Router, null,
                h("div", { path: "/", style: "margin-left: 50%; margin-top:25%; position: relative; left: -50px; width: 200px" }, "WE ARE HOME!"),
                h(myapp.TestComponent, { path: "/Component1", name: 'Component 1' }),
                h(myapp.TestComponent, { path: "/Component2", name: 'Component 2' }),
                h(reactApiTutorial.App, { path: "/ReactApiTutorial" }),
                h(reactTutorial.App, { path: "/ReactTutorial" }),
                h(UnistoreDemo.App, { path: "/UnistoreDemo" }),
                h(reactUnistore.App, { path: "/ReactUnistore" }),
                h(stencilWC.myDropdown, { path: "/stencilWC" }))); };
            return _this;
        }
        return MainRoutes;
    }(Component));
    myRoutes.MainRoutes = MainRoutes;
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.render = function () { return (h("header", { class: "pure-menu pure-menu-horizontal" },
                h("a", { class: 'pure-menu-heading pure-menu-link', href: '/' }, "PREACT-X-DEMOS"),
                h("ul", { class: "pure-menu-list" },
                    h("li", { class: 'pure-menu-item' },
                        h("a", { class: 'pure-menu-link pure-button', href: '/Component1' }, "Comp 1")),
                    h("li", { class: 'pure-menu-item' },
                        h("a", { class: 'pure-menu-link pure-button', href: '/Component2' }, "Comp 2")),
                    h("li", { class: 'pure-menu-item' },
                        h("a", { class: 'pure-menu-link pure-button', href: '/ReactApiTutorial' }, "API")),
                    h("li", { class: 'pure-menu-item' },
                        h("a", { class: 'pure-menu-link pure-button', href: '/ReactTutorial' }, "React Demo")),
                    h("li", { class: 'pure-menu-item' },
                        h("a", { class: 'pure-menu-link pure-button', href: '/UnistoreDemo' }, "Unistore")),
                    h("li", { class: 'pure-menu-item' },
                        h("a", { class: 'pure-menu-link pure-button', href: '/ReactUnistore' }, "React Unistore")),
                    h("li", { class: 'pure-menu-item' },
                        h("a", { class: 'pure-menu-link pure-button', href: '/stencilWC' }, "Stencil Cust. Elem"))))); };
            return _this;
        }
        return Main;
    }(Component));
    myRoutes.Main = Main;
    var StartMenu = (function (_super) {
        __extends(StartMenu, _super);
        function StartMenu() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.render = function () { return (h("div", null,
                h(Main, null),
                h(MainRoutes, null))); };
            return _this;
        }
        return StartMenu;
    }(Component));
    myRoutes.StartMenu = StartMenu;
})(myRoutes || (myRoutes = {}));
