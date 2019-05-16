var myapp;
(function (myapp) {
    document.addEventListener("DOMContentLoaded", function () {
        const h = preact.createElement, render = preact.render;
        render(h(routes.Main, null), document.body);
        render(h(routes.MainRoutes, null), document.body);
    });
})(myapp || (myapp = {}));
