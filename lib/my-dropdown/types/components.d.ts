/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import './stencil.core';




export namespace Components {

  interface MyDropdown {
    'listItems': any[];
  }
  interface MyDropdownAttributes extends StencilHTMLAttributes {
    'listItems'?: any[];
    'onClickedItem'?: (event: CustomEvent) => void;
  }
}

declare global {
  interface StencilElementInterfaces {
    'MyDropdown': Components.MyDropdown;
  }

  interface StencilIntrinsicElements {
    'my-dropdown': Components.MyDropdownAttributes;
  }


  interface HTMLMyDropdownElement extends Components.MyDropdown, HTMLStencilElement {}
  var HTMLMyDropdownElement: {
    prototype: HTMLMyDropdownElement;
    new (): HTMLMyDropdownElement;
  };

  interface HTMLElementTagNameMap {
    'my-dropdown': HTMLMyDropdownElement
  }

  interface ElementTagNameMap {
    'my-dropdown': HTMLMyDropdownElement;
  }


}