import '../../stencil.core';
import { EventEmitter } from "../../stencil.core";
export declare class Dropdown {
    listItems: any[];
    toggle: boolean;
    selectedItem: any;
    clickedItem: EventEmitter;
    handleClick: (item: any) => void;
    toggleList: () => void;
    render(): JSX.Element;
}
