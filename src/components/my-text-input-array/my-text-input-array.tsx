import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-text-input-array',
	shadow: true
})
export class MyTextInputArray {
	@Prop() for: string;


	render() {
		return (
			<div id="sources" class="form-group">
        {this.for}
        <my-dropdown></my-dropdown>
			</div>
		);
	}
}
