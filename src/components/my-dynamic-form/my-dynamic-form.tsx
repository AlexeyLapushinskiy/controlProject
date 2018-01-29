import { Element, Component, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';
import * as ajv from 'ajv/dist/ajv.min.js';

@Component({
  tag: 'my-dynamic-form',
  shadow: true
})
export class MyDynamicForm {

  // @Event() validateData: EventEmitter;

  @State() allTitles: any = {};
  @State() allIds: any = [];
  @State() data: any;
  @State() filledData: any;
  @State() changedData: any;
  @State() invalidMessage: string = null;
  @State() changeValueChecked: boolean = false;

  @Element() el: HTMLElement;

  /**
   * @Prop {any} schema - JSON-schema
   * @Prop {any} form - form for JSON-schema
   */
  @Prop() schema: any;
  @Prop() form: any;

  @Listen('postValue')
  postValueHandler(CustomEvent) {
    this.changeValueChecked = true;
    let value: any = CustomEvent.detail._values.currentValue;
    let id: any = CustomEvent.detail._values.id.match(/\w+$/)[0];
    let data: any = this.filledData || this.data;
    this.fillData(id, value, data);

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
      }
      if ((typeof(ob[key]) === "object") && (!Array.isArray(ob[key])) && (ob[key]) !== null) {
        this.fillData(id, value, ob[key]);
      }
    });
    this.filledData = Object.assign({}, ob);
    this.deletePropsWithoutData(ob);
  };

  deletePropsWithoutData(ob) {
    Object.keys(ob).map((key) => {
      if(ob[key] === null) {
        delete ob[key];
      }
      if((typeof(ob[key]) === "object") && (!Array.isArray(ob[key]))) {
        this.deletePropsWithoutData(ob[key]);
      }
    });
    this.changedData = Object.assign({}, ob);
  };

  /**
   * Call functions for validate of all form fields
   */

  validateForm() {
    this.validate = ajv.compile(this.schema);
    if(this.changeValueChecked === false) {
      this.validate(this.form);
    } else {
      this.validate(this.changedData);
      if(this.validate(this.changedData)) {
        this.invalidMessage = null;
      } else {
        this.invalidMessage = this.updateValidationMessage();
      }
    }
  };

  updateValidationMessage() {
    let unchangedMessage: any = ajv.errorsText(this.validate.errors).replace(/\,?\w*\.?\w*\./g, "").split(" ");
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
   * Getting fields based on properties in JSON-schema
   */

  createField(props: any, key: any, propKey: any) {
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
      return <Tag id={props[key].$id} for={key} value={JSON.stringify(this.form[key])} title={title} allTitles={this.allTitles}/> || null;
    }
    return <Tag id={props[key].$id} for={key} value={this.form[key] ? JSON.stringify(this.form[key]) : this.form[propKey][key]} title={title}/> || null;
  };

  createForm(props, propKey) {
    return Object.keys(props).map((key: any) => {
      if (props[key].hasOwnProperty("properties")) {
        propKey = key;
        return this.createForm(props[key].properties, propKey);
      } else {
        return this.createField(props, key, propKey);
      }
    })
  };

  render() {

    /**
     * Creating form fields and saving it to the let form
     */

    let message: any = null;
    let schemaProps: any = this.schema.properties;

    let form: any = this.createForm(schemaProps, null);

    if (this.invalidMessage) {
      message =
        <div>
          <span>{this.invalidMessage}</span>
        </div>;
    }

    return (
      <div>
        <div>
          {form}
          {message} <br/>
        </div>
        <input type="submit" value="Validate" onClick={() => this.validateForm()} />
      </div>
    );
  }

  componentWillLoad() {

    this.data = Object.assign({}, this.form);

    for (let i = 0; i < this.el.children.length; i++) {
      let child = this.el.children[i];
      let mapKey = child['for'];
      this.mapping[mapKey] = child['localName'];
    }
  }
}
