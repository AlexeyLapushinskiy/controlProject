import { Component, Prop, State } from '@stencil/core';

@Component({
	tag: 'my-text-input',
	shadow: true
})
export class MyTextInput {
	@Prop() for: string;
	@Prop() schema: any;
	@State() prop: any;

	render() {
		return (
			<div>
				<input type="text" value={"input for " + this.for + " (" + this.prop.type + ")"} />
			</div>
		);
	}

	componentWillLoad() {
		this.prop = this.schema.properties[this.for];
	}
}
