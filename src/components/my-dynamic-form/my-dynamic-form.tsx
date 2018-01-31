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
  @State() changedData: any;
  @State() filledData: any;
  @State() invalidMessage: string = null;
  @State() changeValueChecked: boolean = false;

  @Element() el: HTMLElement;

  /**
   * @desc Field data change callback
   * @Prop {any} schema - JSON-schema
   * @Prop {any} form - form for JSON-schema
   */
  @Prop() schema: any;
  @Prop() form: any;

  @Listen('postValue')
  postValueHandler(CustomEvent) {
    this.changeValueChecked = true;

    let fieldId: any = CustomEvent.detail._values.id.match(/\w+$/)[0];
    let fieldValue: any = CustomEvent.detail._values.currentValue;
    let currentFormData: any = this.data;

    currentFormData = this.fillData(fieldId, fieldValue, currentFormData);
    let clearedFormData = Object.assign({}, currentFormData);
    this.changedData = this.deletePropsWithoutData(clearedFormData);
  };

  mapping: Object = {}; // properties of the JSON schema

  /**
   * Functions for filling data object
   */

  fillData(fieldId, fieldValue, currentFormData) {
    Object.keys(currentFormData).map((key) => {
      if(key === fieldId) {
        if(Array.isArray(currentFormData[key])) {
          currentFormData[key][0] = fieldValue;
        } else {
          currentFormData[key] = fieldValue;
        }
        return currentFormData;
      }
      if ((typeof(currentFormData[key]) === "object") && (!Array.isArray(currentFormData[key])) && (currentFormData[key]) !== null) {
        currentFormData[key] = this.fillData(fieldId, fieldValue, currentFormData[key]);
      }
    });
    return currentFormData;
  };

  /**
   * Functions for deleting properties which have value "null"
   */

  deletePropsWithoutData(clearedFormData) {
    let formData = Object.assign({}, clearedFormData);
    Object.keys(formData).map((key) => {
      if(formData[key] === null) {
        delete formData[key];
        return formData;
      }
      if((typeof(formData[key]) === "object") && (!Array.isArray(formData[key]))) {
        formData[key] = this.deletePropsWithoutData(formData[key]);
      }
    });

    return formData;
  };

  /**
   * Call functions for validate of all form fields
   */

  validateForm() {
    let validate = ajv.compile(this.schema);
    if(!this.changeValueChecked) {
      // ajv.validate is not working with nested objects, so we have to make a flat clean clone to validate it,
      // otherwise we should not use nested objects as it is working correctly without them
      validate(this.form);
    } else {
      let dataValidate = validate(this.flatDataObject(this.changedData));
      if(dataValidate) {
        this.invalidMessage = null;
      } else {
        this.invalidMessage = this.updateValidationMessage(validate);
      }
    }
  };

  /**
   * Function for flatting data object for validation
   */

  flatDataObject(data) {
    function flat(res, key, val, pre = '') {
        let prefix: any = [pre, key].filter(v => v).join('.').match(/\w+$/);
        return (typeof val === 'object' && (!Array.isArray(val)))
          ? Object.keys(val).reduce((prev, curr) => flat(prev, curr, val[curr], prefix), res)
          : Object.assign(res, { [prefix]: val});
    }
    return Object.keys(data).reduce((prev, curr) => flat(prev, curr, data[curr]), {});
  }

  updateValidationMessage(validate) {
    let unchangedMessage: any = ajv.errorsText(validate.errors).replace(/\,?\w*\.?\w*\./g, "").split(" ");
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

  createField(schemaProps: any, prop: any, schemaPropKey: any) {
    let {type} = schemaProps[prop];
    let Tag = this.mapping[type];
    let title: string = schemaProps[prop].title;
    let id: string = schemaProps[prop].$id;
    this.allTitles[prop] = title;

    if (!title) {
      schemaProps[prop].items ? title = schemaProps[prop].items.title : title = 'Unnamed field';
      this.allTitles[prop] = title;
    }

    if (prop === "button") {
      return <Tag id={schemaProps[prop].$id} for={prop} value={JSON.stringify(this.form[prop])} title={title} allTitles={this.allTitles}/> || null;
    }
    return <Tag id={schemaProps[prop].$id} for={prop} value={this.form[prop] ? JSON.stringify(this.form[prop]) : this.form[schemaPropKey][prop]} title={title}/> || null;
  };

  createForm(schemaProps, schemaPropKey) {
    return Object.keys(schemaProps).map((prop: any) => {
      if (schemaProps[prop].hasOwnProperty("properties")) {
        schemaPropKey = prop;
        return this.createForm(schemaProps[prop].properties, schemaPropKey);
      } else {
        return this.createField(schemaProps, prop, schemaPropKey);
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
