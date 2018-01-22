import {Element, Component, Prop, State, Listen} from '@stencil/core';
import * as ajv from 'ajv/dist/ajv.min.js';

@Component({
  tag: 'my-dynamic-form',
  shadow: true
})
export class MyDynamicForm {
  @State() allTitles: any = {};
  @State() invalidMessage: string = null;

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
  }

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
    this.allTitles[keyProp] = title;

    return this.form[key].hasOwnProperty(keyProp) ?
      <Tag for={keyProp} value={JSON.stringify(this.form[key][keyProp])} title={title}/> : null;
  };

  /**
   * Getting fields based on properties in JSON-schema
   */
  getSecondProps(props, key) {
    let {type} = props[key];
    let Tag = this.mapping[type];
    let title: string = props[key].title;
    this.allTitles[key] = title;

    if (!title) {
      props[key].items ? title = props[key].items.title : title = 'Unnamed field';
      this.allTitles[key] = title;
    }

    if (key === "button") {
      return this.form.hasOwnProperty(key) ?
        <Tag for={key} value={JSON.stringify(this.form[key])} title={title} allTitles={this.allTitles}/> : null;
    }

    return this.form.hasOwnProperty(key) ? <Tag for={key} value={JSON.stringify(this.form[key])} title={title}/> : null;
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
    }

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
