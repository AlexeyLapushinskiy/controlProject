import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-text-input',
	shadow: true
})
export class MyTextInput {
	@Prop() for: string;

	render() {
		return (
			<div  class="form-group">
        <label>
          {this.for}<br/>
				  <input type="text" /><br/><br/>
        </label>
			</div>
		);
	}
}
