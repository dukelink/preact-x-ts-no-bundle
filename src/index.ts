/// <reference path="../node_modules/preact/dist/preact.d.ts" />

namespace myapp {
    document.addEventListener("DOMContentLoaded", function() {
        const h = preact.h, render = preact.render; // IMPORTS, can inject with destructor parameter!!!

        render(h(routes.Main, null), document.body);
        render(h(routes.MainRoutes, null), document.body);
    });  
}
// STUDY: Bundling best practices with micro libraries:
// https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953
// https://stackoverflow.com/questions/50124241/including-a-iife-module-in-bundle
// https://engineering.mixmax.com/blog/rollup-externals
// https://stackoverflow.com/questions/34866510/building-a-javascript-library-why-use-an-iife-this-way

// STUDY: Simplified custom elements:
// https://medium.com/@WebReflection/a-wicked-custom-elements-alternative-6d1504b5857f

// https://dominicstpierre.com/how-to-start-with-typescript-and-preact-a9ea3e0ba4dc
// https://www.contentful.com/blog/2018/01/23/how-to-write-reusable-sane-api-based-components/
// https://custom-elements-everywhere.com
// https://medium.com/@ankur.kus1/building-plug-and-play-web-modules-using-preact-5a00fc1d9d8f
// https://github.com/bspaulding/preact-custom-element
// https://github.com/developit/preact/releases/tag/10.0.0-alpha.0
// https://github.com/master-atul/webcomponents-with-react-webcomponentify
// https://www.atulr.com/webcomponents-with-react-webcomponentify/
// https://www.atulr.com/webcomponents-with-react-webcomponentify/

