import {Element, Component, Prop, State, Listen} from '@stencil/core';
import * as ajv from 'ajv/dist/ajv.min.js';

@Component({
  tag: 'my-dynamic-form',
  shadow: true
})
export class MyDynamicForm {
  @State() allTitles: any = {};
  @State() allValues: any = {};
  @State() invalidMessage: string = null;

  @Element() el: HTMLElement;

  /**
   * @Prop {any} schema - JSON-schema
   * @Prop {any} form - form for JSON-schema
   */
  @Prop() schema: any;
  @Prop() form: any;

  // @Listen('validateForm')
  // validateFormHandler() {
  //   this.validateForm();
  // };

  @Listen('postValue')
  postValueHandler(CustomEvent) {
    console.log(CustomEvent);
    let value: any = CustomEvent.detail._values.currentValue;
    let id: any = CustomEvent.detail._values.id;
    this.allValues[id] = value;
    console.log(this.allValues);
  };


  mapping: Object = {}; // properties of the JSON schema
  validate;

  /**
   * Call functions for validate of all form fields
   */
  validateForm() {
    this.validate = ajv.compile(this.schema);

    let formData = {
      "checked": this.getCheckboxValue(),
      "duration": this.getDurationValue(),
      "startDate": this.getStartDateValue(),
      "endDate": this.getEndDateValue(),
      "sources": this.getSourcesValue()
    };

    if (this.validate(formData)) {
      this.invalidMessage = null;
    } else {
      this.invalidMessage = this.updateValidationMessage();
    }
  };

  getCheckboxValue() {
    let myCheckbox: any = this.el.shadowRoot.querySelector('my-checkbox');
    let checkbox: any = myCheckbox.shadowRoot.getElementById('check-schema');

    return checkbox.getAttribute("checked") === "true";
  };

  getStartDateValue() {
    let myDates: any = this.el.shadowRoot.querySelectorAll('my-text-input');
    let startDateValue: string = null;

    for (let el of myDates) {
      let shadowEl: any = el.shadowRoot.querySelector('label');
      let elText: string = shadowEl.innerText;
      let elValue: string = el.shadowRoot.querySelector('input').value;

      if (elText.trim() === "The Startdate Schema") {
        startDateValue = elValue;
      }
    }

    return startDateValue;
  };

  getEndDateValue() {
    let myDates: any = this.el.shadowRoot.querySelectorAll('my-text-input');
    let endDateValue: string = null;

    for (let el of myDates) {
      let shadowEl: any = el.shadowRoot.querySelector('label');
      let elText: string = shadowEl.innerText;
      let elValue: string = el.shadowRoot.querySelector('input').value;

      if (elText.trim() === "The Enddate Schema") {
        endDateValue = elValue;
      }
    }

    return endDateValue;
  };

  getDurationValue() {
    let myNumberInput: any = this.el.shadowRoot.querySelectorAll('my-number-input');
    let durationValue: any = {};
    let el: HTMLElement = null;

    for (el of myNumberInput) {
      let labelText: string = el.shadowRoot.querySelector('label').innerText;
      let inputValue: string = el.shadowRoot.querySelector('input').value;

      labelText.trim() === "The Min Schema" ? durationValue.min = parseInt(inputValue) : durationValue.max = parseInt(inputValue);
    }

    return durationValue;
  };

  getSourcesValue() {
    let myTextInputArray: any = this.el.shadowRoot.querySelector('my-text-input-array');
    let dropdown: any = myTextInputArray.shadowRoot.querySelector('my-dropdown');
    let select: any = dropdown.shadowRoot.querySelector('select');
    let options: any = select.querySelectorAll('option');
    let sourcesValue: any = [];
    let el: HTMLElement = null;

    for (el of options) {
      let optionText: string = el.innerText;
      sourcesValue.push(optionText);
    }

    return sourcesValue;
  };

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

    this.fillDataByDefault(id);

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

    this.fillDataByDefault(id);

    if (key === "button") {
      return this.form.hasOwnProperty(key) ? <Tag id={props[key].$id} for={key} value={JSON.stringify(this.form[key])} title={title} allTitles={this.allTitles}/> : null;
    }
    return this.form.hasOwnProperty(key) ? <Tag id={props[key].$id} for={key} value={JSON.stringify(this.form[key])} title={title}/> : null;
  };

  /**
   * Function for filling data object by default (after rendering)
   */

  fillDataByDefault(id) {
    let lastPartOfId: any = /\w+$/.exec(id)[0];
    Object.keys(this.form).map((formProp) => {
      if(Object.keys(this.form[formProp]).length !== 0) {
        Object.keys(this.form[formProp]).map((innerFormProp) => {
          if (innerFormProp === lastPartOfId) {
            Array.isArray(this.form[formProp][innerFormProp]) ? this.allValues[id] = this.form[formProp][innerFormProp][0] : this.allValues[id] = this.form[formProp][innerFormProp];
          }
        })
      }
      if (formProp === lastPartOfId) {
        Array.isArray(this.form[formProp]) ? this.allValues[id] = this.form[formProp][0] : this.allValues[id] = this.form[formProp];
      }
    });
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
    for (let i = 0; i < this.el.children.length; i++) {
      let child = this.el.children[i];
      let mapKey = child['for'];
      this.mapping[mapKey] = child['localName'];
    }
  }
}
