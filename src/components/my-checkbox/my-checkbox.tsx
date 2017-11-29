import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-checkbox',
	shadow: true
})
export class MyCheckbox {
	@Prop() for: string;

	render() {
		return (
			<div>
				<label>
					<input type="checkbox" />checkbox for {this.for}
				</label>
			</div>
		);
	}
}
