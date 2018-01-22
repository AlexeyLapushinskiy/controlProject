/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */


import {
  MyButton as MyButton
} from './components/my-button/my-button';

declare global {
  interface HTMLMyButtonElement extends MyButton, HTMLElement {
  }
  var HTMLMyButtonElement: {
    prototype: HTMLMyButtonElement;
    new (): HTMLMyButtonElement;
  };
  interface HTMLElementTagNameMap {
    "my-button": HTMLMyButtonElement;
  }
  interface ElementTagNameMap {
    "my-button": HTMLMyButtonElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "my-button": JSXElements.MyButtonAttributes;
    }
  }
  namespace JSXElements {
    export interface MyButtonAttributes extends HTMLAttributes {
      allTitles?: any;
      for?: string;
    }
  }
}

