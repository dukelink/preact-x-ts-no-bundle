var routes;
(function (routes) {
    const Component = preact.Component, h = preact.h, Router = preactRouter, Link = function (props) {
        console.log(props);
        console.log(Router.Link(props));
        return Router.Link(props);
    };
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
    routes.MainRoutes = MainRoutes;
    class Main extends Component {
        constructor() {
            super(...arguments);
            this.render = () => (h("header", null,
                h(Link, { activeClassName: 'logo', class: 'logo', href: '/' }, "PREACT-DEMOS"),
                h(Link, { activeClassName: 'logo', class: 'button', href: '/Component1' }, "Comp 1"),
                h("a", { class: 'button', href: '/Component2' }, "Comp 2"),
                h("a", { class: 'button', href: '/ReactApiTutorial' }, "API"),
                h("a", { class: 'button', href: '/ReactTutorial' }, "React Demo"),
                h("a", { class: 'button', href: '/UnistoreDemo' }, "Unistore"),
                h("a", { class: 'button', href: '/ReactUnistore' }, "React Unistore"),
                h("a", { class: 'button', href: '/stencilWC' }, "Stencil Cust. Elem")));
        }
    }
    routes.Main = Main;
})(routes || (routes = {}));
