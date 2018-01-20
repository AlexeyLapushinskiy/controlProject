import { Component, Element, Prop } from '@stencil/core';
// import 'bootstrap/dist/css/bootstrap.css'
import * as ajv from 'ajv/dist/ajv.min.js';


const schema = {
  "definitions": {},
  "$id": "http://json-schema.org/draft-06/schema#",
  "$schema": "http://json-schema.org/draft-06/schema#",
  "type": "object",
  "properties": {
    "checked": {
      "$id": "/properties/checked",
      "type": "boolean",
      "title": "The Checked Schema",
      "description": "An explanation about the purpose of this instance.",
      "default": false,
      "examples": [
        false
      ]
    },
    "duration": {
      "$id": "/properties/duration",
      "type": "object",
      "properties": {
        "min": {
          "$id": "/properties/duration/properties/min",
          "type": "integer",
          "title": "The Min Schema",
          "description": "An explanation about the purpose of this instance.",
          "default": 0,
          "examples": [
            5
          ]
        },
        "max": {
          "$id": "/properties/duration/properties/max",
          "type": "integer",
          "title": "The Max Schema",
          "description": "An explanation about the purpose of this instance.",
          "default": 0,
          "examples": [
            10
          ]
        }
      }
    },
    "startDate": {
      "$id": "/properties/startDate",
      "type": "string",
      "title": "The Startdate Schema",
      "description": "An explanation about the purpose of this instance.",
      "default": "",
      "examples": [
        "2007-08-31T16:47+00:00"
      ]
    },
    "endDate": {
      "$id": "/properties/endDate",
      "type": "string",
      "title": "The Enddate Schema",
      "description": "An explanation about the purpose of this instance.",
      "default": "",
      "examples": [
        "2007-08-31T16:47+00:00"
      ]
    },
    "sources": {
      "$id": "/properties/sources",
      "type": "array",
      "items": {
        "$id": "/properties/sources/items",
        "type": "string",
        "title": "The 0 Schema",
        "description": "An explanation about the purpose of this instance.",
        "default": "",
        "examples": [
          "source1"
        ]
      }
    },
    "button": {
      "$id": "/properties/button",
      "type": "submit"
    }
  }
};
let validate = ajv.compile(schema);

@Component({
	tag: 'my-button',
	shadow: true
})
export class MyButton {

  @Element()
  element: HTMLElement;

  @Prop() for: string;

  validateForm() {

    let myDinamicForm: any  = document.querySelector('my-dynamic-form');

    let startDateValue: string = null;
    let endDateValue: string = null;
    let checkboxValue: boolean = null;
    let durationValue: any = {};
    let sourcesValue: any = [];


    let myNumberInput: any  = myDinamicForm.shadowRoot.querySelectorAll('my-number-input');
    let el: HTMLElement = null;
    for(el of myNumberInput) {
      let labelText: string  = el.shadowRoot.querySelector('label').innerText;
      let inputValue: string  = el.shadowRoot.querySelector('input').value;
      labelText.trim() === "min" ? durationValue.min = parseInt(inputValue) : durationValue.max = parseInt(inputValue);
    }

    let myCheckbox: any  = myDinamicForm.shadowRoot.querySelector('my-checkbox');
    let checkbox: any = myCheckbox.shadowRoot.getElementById('check-schema');
    checkboxValue = checkbox.getAttribute("checked") === "true" ? true : false;

    let myDates: any  = myDinamicForm.shadowRoot.querySelectorAll('my-text-input');
    for (let el of myDates) {
      let shadowEl: any = el.shadowRoot.querySelector('label');
      let elText: string = shadowEl.innerText;
      let elValue: string = el.shadowRoot.querySelector('input').value;
      elText.trim() === "startDate" ?  startDateValue = elValue : endDateValue = elValue;
    };

    let myTextInputArray: any  = myDinamicForm.shadowRoot.querySelector('my-text-input-array');
    let dropdown: any = myTextInputArray.shadowRoot.querySelector('my-dropdown');
    let select: any = dropdown.shadowRoot.querySelector('select');
    let options: any = select.querySelectorAll('option');
    for(el of options) {
      let optionText: string = el.innerText;
      sourcesValue.push(optionText);
    }

    let data = {"checked": checkboxValue, "duration": durationValue, "startDate": startDateValue, "endDate": endDateValue, "sources": sourcesValue};

    let valid = validate(data);
    if (valid) {
      console.log("Valid!");
    } else {
      console.log('Invalid: ' + ajv.errorsText(validate.errors));
    }

  };

	render() {

		return (
      <input class="btn btn-lg btn-primary" type="submit" value="Validate" onClick={this.validateForm} />
		);
	}
}
