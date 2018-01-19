import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-number-input',
	shadow: true
})
export class NumberInput {
  @Prop() for: string;

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
