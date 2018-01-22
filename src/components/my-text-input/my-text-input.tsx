import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-text-input',
	shadow: true
})
export class MyTextInput {
	@Prop() for: string;
	@Prop() value: string;
	@Prop() title: string;

	render() {
    const parsedValue = this.value ? JSON.parse(this.value): '';

    return (
			<div  class="form-group">
        <label>
          {this.title}<br/>
				  <input type="text" value={parsedValue} /><br/><br/>
        </label>
			</div>
		);
	}
}
