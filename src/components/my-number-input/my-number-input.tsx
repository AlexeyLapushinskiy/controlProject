import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-number-input',
	shadow: true
})
export class NumberInput {
  @Prop() for: string;
  @Prop() value: string;
  @Prop() title: string;

	render() {
		return (
			<div>
        <label>
          {this.title}<br/>
          <input id="min-schema" value={this.value} type="number" /><br/><br/>
        </label>
			</div>
		);
	}
}
