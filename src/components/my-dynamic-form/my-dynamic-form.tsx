import {Element, Component, Prop, State, Listen} from '@stencil/core';
import * as ajv from 'ajv/dist/ajv.min.js';

@Component({
  tag: 'my-dynamic-form',
  shadow: true
})
export class MyDynamicForm {
  @State() allTitles: any = {};
  @State() allIds: any = [];
  @State() data: any = {};
  @State() invalidMessage: string = null;
  @State() changeValueChecked: boolean = false;

  @Element() el: HTMLElement;

  /**
   * @Prop {any} schema - JSON-schema
   * @Prop {any} form - form for JSON-schema
   */
  @Prop() schema: any;
  @Prop() form: any;

  @Listen('validateForm')
  validateFormHandler() {
    this.validateForm();
  };

  @Listen('postValue')
  postValueHandler(CustomEvent) {
    this.changeValueChecked = true;
    let value: any = CustomEvent.detail._values.currentValue;
    let id: any = CustomEvent.detail._values.id.match(/\w+$/)[0];
    // this.checkOnRepeat(this.allIds, id);
    let ob: any = this.data;
    this.fillData(id, value, ob);
  };

  mapping: Object = {}; // properties of the JSON schema
  validate;

  /**
   * Functions for filling data object
   */
  fillData(id, value, ob) {
    Object.keys(ob).map((key) => {
      if(key === id) {
        if(Array.isArray(ob[key])) {
          ob[key] = [];
          ob[key][0] = value;
        } else {
          ob[key] = value;
        }
        return;
      }
      if ((typeof(ob[key]) === "object") && (!Array.isArray(ob[key])) && (ob[key]) !== null) {
        this.fillData(id, value, ob[key]);
      }
    })
  };

  /**
   * Call functions for validate of all form fields
   */

  validateForm() {
    this.validate = ajv.compile(this.schema);

    if(this.changeValueChecked === false) {
      this.validate(this.form);
    } else {
      if(this.validate(this.data)) {
        this.invalidMessage = null;
      } else {
        this.invalidMessage = this.updateValidationMessage();
      }
    }
  };

  makeClone(obj) {
  let clone = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if ("object"===typeof (obj[prop])){
        if(Array.isArray(obj[prop])) {
          clone[prop] = obj[prop];
        } else {
          clone[prop] = this.makeClone(obj[prop]);
        }
      }
      else {
        clone[prop] = obj[prop];
      }
    }
  }
  return clone;
}

  updateValidationMessage() {
    let unchangedMessage: any = ajv.errorsText(this.validate.errors).replace(/\,?\w*\.\w*\./g, "").split(" ");
    Object.keys(this.allTitles).map((title: string) => {
      for (let el in unchangedMessage) {
        if (unchangedMessage[el] === title) {
          unchangedMessage[el] = this.allTitles[title];
        }
      }
    });
    return unchangedMessage.toString().replace(/\,(?!\,)/g, " ");
  };

  /**
   * Getting fields based on properties of properties in JSON schema
   */
  getFirstProps(propsKeyProps, key, keyProp) {
    let {type} = propsKeyProps[keyProp];
    let Tag = this.mapping[type];
    let title = propsKeyProps[keyProp].title;
    let id: string = propsKeyProps[keyProp].$id;
    this.allTitles[keyProp] = title;

    return this.form[key].hasOwnProperty(keyProp) ?
      <Tag id={propsKeyProps[keyProp].$id} for={keyProp} value={JSON.stringify(this.form[key][keyProp])} title={title}/> : null;
  };

  /**
   * Getting fields based on properties in JSON-schema
   */
  getSecondProps(props, key) {
    let {type} = props[key];
    let Tag = this.mapping[type];
    let title: string = props[key].title;
    let id: string = props[key].$id;
    this.allTitles[key] = title;

    if (!title) {
      props[key].items ? title = props[key].items.title : title = 'Unnamed field';
      this.allTitles[key] = title;
    }

    if (key === "button") {
      return this.form.hasOwnProperty(key) ? <Tag id={props[key].$id} for={key} value={JSON.stringify(this.form[key])} title={title} allTitles={this.allTitles}/> : null;
    }
    return this.form.hasOwnProperty(key) ? <Tag id={props[key].$id} for={key} value={JSON.stringify(this.form[key])} title={title}/> : null;
  };

  render() {

    /**
     * Creating form fields and saving it to the let form
     */

    let message: any = null;

    let form: any = Object.keys(this.schema.properties).map((key: any) => {
      let props: any = this.schema.properties;
      if (props[key].properties) {
        return Object.keys(props[key].properties).map((keyProp: any) => {
          let propsKeyProps: any = props[key].properties;
          return this.getFirstProps(propsKeyProps, key, keyProp);
        })
      } else {
        return this.getSecondProps(props, key);
      }
    });

    if (this.invalidMessage) {
      message =
        <div>
          <span>{this.invalidMessage}</span>
        </div>;
    };

    return (
      <div>
        {form}

        {message} <br/>
      </div>
    );
  }

  componentWillLoad() {
    /**
     * Create object for saving form data
     */
    this.data = this.makeClone(this.form);
    for (let i = 0; i < this.el.children.length; i++) {
      let child = this.el.children[i];
      let mapKey = child['for'];
      this.mapping[mapKey] = child['localName'];
    }
  }
}
