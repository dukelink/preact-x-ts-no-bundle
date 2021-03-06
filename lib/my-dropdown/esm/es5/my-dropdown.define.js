
// MyDropdown: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './my-dropdown.core.js';
import { COMPONENTS } from './my-dropdown.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
