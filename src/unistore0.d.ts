/// <reference path="../node_modules/preact/dist/preact.d.ts" />
/// <reference path="unistore1.d.ts" />

// T - Wrapped component props
// S - Wrapped component state
// K - Store state
// I - Injected props to wrapped component

declare namespace unistore {
//	import * as Preact from "preact";
//	import { ActionCreator, StateMapper, Store } from "unistore";

	export function connect<T, S, K, I>(
		mapStateToProps: string | Array<string> | unistore.StateMapper<T, K, I>,
		actions?: unistore.ActionCreator<K> | object
	): (Child: preact.ComponentConstructor<T & I, S> | preact.AnyComponent<T & I, S>) => preact.ComponentConstructor<T, S>;


	export interface ProviderProps<T> {
		store: unistore.Store<T>;
	}

	export class Provider<T> extends preact.Component<ProviderProps<T>> {
		render(props: ProviderProps<T>): JSX.Element;
	}
}
