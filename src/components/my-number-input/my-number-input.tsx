import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-number-input',
	shadow: true
})
export class MyNumberInput {
  @Prop() for: string;

	render() {
		return (
			<div>
        <label>
          {this.for} <br/>
          <input type="number" /><br/><br/>
        </label>
			</div>
		);
	}
}
