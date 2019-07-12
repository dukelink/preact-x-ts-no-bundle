import { Ref } from '.';
import {
	Component as PreactComponent,
	VNode as PreactVNode,
	FunctionalComponent as PreactFunctionalComponent
} from './internal';
import { SuspenseProps } from './compat-suspense';

export { ComponentChildren } from '.';

export { PreactElement } from './internal';

export interface Component<P = {}, S = {}> extends PreactComponent<P, S> {
	isReactComponent?: object;
	isPureReactComponent?: true;

	_childDidSuspend?(error: Promise<void>): void;
}

export interface FunctionalComponent<P = {}> extends PreactFunctionalComponent<P> {
	shouldComponentUpdate?(nextProps: Readonly<P>): boolean;
	_forwarded?: boolean;
}

export interface VNode<T = any> extends PreactVNode<T> {
	$$typeof?: symbol | string;
	preactCompatNormalized?: boolean;
}

export interface ForwardFn<P = {}, T = any> {
	(props: P, ref: Ref<T>): VNode;
	displayName?: string;
}

export interface SuspenseState {
	_parkedChildren: VNode<any>[];
}

export interface SuspenseComponent extends PreactComponent<SuspenseProps, SuspenseState> {
	_suspensions: Array<Promise<any>>;
}
