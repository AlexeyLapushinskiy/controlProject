import { Component, Prop } from '@stencil/core';
// import * as schema from '../schemas/schema.json';
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
  @Prop() for: string;


  validateForm() {

    let myDinamicForm: any  = document.querySelector('my-dynamic-form');

    let startDateValue: string = null;
    let endDateValue: string = null;
    let checkboxValue: boolean = null;
    let durationValue: any = {};
    let sourcesValue: any = [];


    let myNumberInput: any  = myDinamicForm.shadowRoot.querySelector('my-number-input');
    let minSchema: any = myNumberInput.shadowRoot.getElementById('min-schema');
    durationValue.minSchemaValue = minSchema.value;
    console.log(durationValue);
    //
    let myCheckbox: any  = myDinamicForm.shadowRoot.querySelector('my-checkbox');
    let checkbox: any = myCheckbox.shadowRoot.getElementById('check-schema');
    checkboxValue = checkbox.getAttribute("checked") === "true" ? true : false;
    console.log(checkboxValue);

    let myDates: any  = myDinamicForm.shadowRoot.querySelectorAll('my-text-input');
    for (let el of myDates) {
      let shadowEl: any = el.shadowRoot.querySelector('label');
      let elText: string = shadowEl.innerText;
      let elValue: string = el.shadowRoot.querySelector('input').value;
      elText.trim() === "startDate" ?  startDateValue = elValue : endDateValue = elValue;
    };

    let mySources: any  = myDinamicForm.shadowRoot.querySelector('my-text-input-array');
    let sources: any = mySources.shadowRoot.getElementById('sources');
    sourcesValue.push(sources.value);
    console.log(sourcesValue);

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
			<div>
        <input type="submit" value="Validate" onClick={this.validateForm} />
			</div>
		);
	}
}
