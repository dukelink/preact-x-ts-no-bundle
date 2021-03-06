/// <reference path="../lib/preact-beta1-dts-edited/index.d.ts" />
/// <reference path="../lib/preact-beta1-dts-edited/preact-router-index.d.ts" />

//import { Fragment } from "../lib/preact-beta1-dts-edited";

namespace myRoutes {
	// Imports:
	declare function preactRouter();
//	declare function Link({children,class:any,href});

//	debugger;

	const 
		Component = preact.Component,
		h = preact.h, 
		Router : any = preactRouter;
		/*
		Link : any = function(props) { 
			// Existing hook can allow implementation of activeClassName
			// if I don't want to figure out how to convert Match to IIFE / UMD module
			// using Rollup or similar bundler....
			console.log(props);
			console.log(Router.Link(props));
			return Router.Link(props) 
		};
		*/
	export class MainRoutes extends Component
	{ render = () => (
		<Router>
			<div path="/" style="margin-left: 50%; margin-top:25%; position: relative; left: -50px; width: 200px">WE ARE HOME!</div>
			<myapp.TestComponent path="/Component1" name='Component 1' />
			<myapp.TestComponent path="/Component2" name='Component 2' />
			<reactApiTutorial.App path="/ReactApiTutorial" />
			<reactTutorial.App path="/ReactTutorial" />
			<UnistoreDemo.App path="/UnistoreDemo" />
			<reactUnistore.App path="/ReactUnistore" />
			<stencilWC.myDropdown path="/stencilWC" />
		</Router>
	)}

	export class Main extends Component
	{ render = () => (
		<header>
{/*	TODO: Try to get style change to highlight selected option...
			<Link activeClassName='logo' class='logo' href='/'>PREACT-DEMOS</Link>
			<Link activeClassName='logo' class='button' href='/Component1'>Comp 1</Link>
*/}
			<a class='logo' href='/'>PREACT-X-DEMOS</a>
			<a class='button' href='/Component1'>Comp 1</a>
			<a class='button' href='/Component2'>Comp 2</a>
			<a class='button' href='/ReactApiTutorial'>API</a>
			<a class='button' href='/ReactTutorial'>React Demo</a>
			<a class='button' href='/UnistoreDemo'>Unistore</a>
			<a class='button' href='/ReactUnistore'>React Unistore</a>
			<a class='button' href='/stencilWC'>Stencil Cust. Elem</a>
		</header>
	)}

	export class StartMenu extends Component
	{ render = () => (
		<div>
			<Main />
			<MainRoutes />
		</div>
	)}

}


// STUDY: 
// Module systems: 
// https://medium.freecodecamp.org/anatomy-of-js-module-systems-and-building-libraries-fadcd8dbd0e
// http://2ality.com/2017/01/babel-esm-spec-mode.html