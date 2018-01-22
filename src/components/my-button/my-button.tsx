import { Component, Element, Prop, State } from '@stencil/core';
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

  @State() invalid: boolean = false;

  @Element()
  element: HTMLElement;

  @Prop() for: string;

  validateForm() {

    let myDinamicForm: any  = document.querySelector('my-dynamic-form');

    let checkboxValue: boolean = this.getCheckboxValue(myDinamicForm);
    let startDateValue: string = this.getStartDateValue(myDinamicForm);
    let endDateValue: string = this.getEndDateValue(myDinamicForm);
    let durationValue: any = this.getDurationValue(myDinamicForm);
    let sourcesValue: any = this.getSourcesValue(myDinamicForm);

    let data = {"checked": checkboxValue, "duration": durationValue, "startDate": startDateValue, "endDate": endDateValue, "sources": sourcesValue};
    console.log("data");
    console.log(data);

    let valid = validate(data);
    if (valid) {
      console.log("Valid!");
    } else {
      this.invalid = true;
      console.log('Invalid: ' + ajv.errorsText(validate.errors));
    }

  };

  getCheckboxValue (myDinamicForm) {
    let myCheckbox: any  = myDinamicForm.shadowRoot.querySelector('my-checkbox');
    let checkbox: any = myCheckbox.shadowRoot.getElementById('check-schema');
    let checkboxValue = checkbox.getAttribute("checked") === "true" ? true : false;
    return checkboxValue;
  };

  getStartDateValue(myDinamicForm) {
    let myDates: any  = myDinamicForm.shadowRoot.querySelectorAll('my-text-input');
    let startDateValue: string = null;
    for (let el of myDates) {
      let shadowEl: any = el.shadowRoot.querySelector('label');
      let elText: string = shadowEl.innerText;
      let elValue: string = el.shadowRoot.querySelector('input').value;
      if (elText.trim() === "startDate") {
        startDateValue = elValue;
      }
    }
    return startDateValue;
  };

  getEndDateValue(myDinamicForm) {
    let myDates: any  = myDinamicForm.shadowRoot.querySelectorAll('my-text-input');
    let endDateValue: string = null;
    for (let el of myDates) {
      let shadowEl: any = el.shadowRoot.querySelector('label');
      let elText: string = shadowEl.innerText;
      let elValue: string = el.shadowRoot.querySelector('input').value;
      if (elText.trim() === "startDate") {
        endDateValue = elValue;
      }
    }
    return endDateValue;
  };

  getDurationValue (myDinamicForm) {
    let myNumberInput: any  = myDinamicForm.shadowRoot.querySelectorAll('my-number-input');
    let durationValue: any = {};
    let el: HTMLElement = null;
    for(el of myNumberInput) {
      let labelText: string  = el.shadowRoot.querySelector('label').innerText;
      let inputValue: string  = el.shadowRoot.querySelector('input').value;
      labelText.trim() === "min" ? durationValue.min = parseInt(inputValue) : durationValue.max = parseInt(inputValue);
    }
    return durationValue;
  };

  getSourcesValue(myDinamicForm) {
    let myTextInputArray: any  = myDinamicForm.shadowRoot.querySelector('my-text-input-array');
    let dropdown: any = myTextInputArray.shadowRoot.querySelector('my-dropdown');
    let select: any = dropdown.shadowRoot.querySelector('select');
    let options: any = select.querySelectorAll('option');
    let sourcesValue: any = [];
    let el: HTMLElement = null;
    for(el of options) {
      let optionText: string = el.innerText;
      sourcesValue.push(optionText);
    }
    return sourcesValue;
  };

	render() {

	  let invalidMessage: any = null;

	  if (this.invalid === true) {
	    invalidMessage =
        <div>
          <span class="invalid-data-message">Invalid data! Please, check your form.</span>
        </div>;
    }

		return (
		  <div>
        <input class="btn btn-lg btn-primary" type="submit" value="Validate" onClick={() => this.validateForm()} />
        {invalidMessage}
      </div>
		);
	}
}
