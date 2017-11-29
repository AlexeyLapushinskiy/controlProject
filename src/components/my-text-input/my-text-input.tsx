import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-text-input',
	shadow: true
})
export class MyTextInput {
	@Prop() for: string;

	render() {
		return (
			<div>
				<input type="text" value={'input for ' + this.for} />
			</div>
		);
	}
}
