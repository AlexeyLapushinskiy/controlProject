import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-text-input-array',
	shadow: true
})
export class MyTextInputArray {
	@Prop() for: string;


	render() {
		return (
			<div>
        <label>
          {this.for} <br/>
				  <input id="sources" type="text" /><br/><br/>
        </label>
			</div>
		);
	}
}
