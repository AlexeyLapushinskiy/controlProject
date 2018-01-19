import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-number-input',
	shadow: true
})
export class MyNumberInput {
  @Prop() for: string;

  // setValue (event) {
  //   let currentValue = event.currentTarget.value;
  //   event.currentTarget.setAttribute("value", currentValue);
  //   console.log(event.currentTarget.getAttribute("value"));
  // };

	render() {

		return (
			<div>
        <label>
          {this.for}<br/>
          <input id="min-schema" value="" type="number" /><br/><br/>
        </label>
			</div>
		);
	}
}
