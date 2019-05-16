var myRoutes;
(function (myRoutes) {
    const Component = preact.Component, h = preact.h, Router = preactRouter;
    class MainRoutes extends Component {
        constructor() {
            super(...arguments);
            this.render = () => (h(Router, null,
                h("div", { path: "/", style: "margin-left: 50%; margin-top:25%; position: relative; left: -50px; width: 200px" }, "WE ARE HOME!"),
                h(myapp.TestComponent, { path: "/Component1", name: 'Component 1' }),
                h(myapp.TestComponent, { path: "/Component2", name: 'Component 2' }),
                h(reactApiTutorial.App, { path: "/ReactApiTutorial" }),
                h(reactTutorial.App, { path: "/ReactTutorial" }),
                h(UnistoreDemo.App, { path: "/UnistoreDemo" }),
                h(reactUnistore.App, { path: "/ReactUnistore" }),
                h(stencilWC.myDropdown, { path: "/stencilWC" })));
        }
    }
    myRoutes.MainRoutes = MainRoutes;
    class Main extends Component {
        constructor() {
            super(...arguments);
            this.render = () => (h("header", null,
                h("a", { class: 'logo', href: '/' }, "PREACT-DEMOS"),
                h("a", { class: 'button', href: '/Component1' }, "Comp 1"),
                h("a", { class: 'button', href: '/Component2' }, "Comp 2"),
                h("a", { class: 'button', href: '/ReactApiTutorial' }, "API"),
                h("a", { class: 'button', href: '/ReactTutorial' }, "React Demo"),
                h("a", { class: 'button', href: '/UnistoreDemo' }, "Unistore"),
                h("a", { class: 'button', href: '/ReactUnistore' }, "React Unistore"),
                h("a", { class: 'button', href: '/stencilWC' }, "Stencil Cust. Elem")));
        }
    }
    myRoutes.Main = Main;
    class StartMenu extends Component {
        constructor() {
            super(...arguments);
            this.render = () => (h("div", null,
                h(Main, null),
                h(MainRoutes, null)));
        }
    }
    myRoutes.StartMenu = StartMenu;
})(myRoutes || (myRoutes = {}));
