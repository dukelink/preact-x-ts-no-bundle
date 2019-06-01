var myapp;
(function (myapp) {
    document.addEventListener("DOMContentLoaded", function () {
        var h = preact.createElement, render = preact.render;
        render(h(myRoutes.StartMenu, null), document.body);
    });
})(myapp || (myapp = {}));
