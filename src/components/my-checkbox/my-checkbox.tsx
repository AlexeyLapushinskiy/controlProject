import { Element, Component, Prop, State } from '@stencil/core';

@Component({
	tag: 'my-checkbox',
	shadow: true
})
export class MyCheckbox {
	@Prop() for: string;
	@Prop() schema: any;

	@Element() el: HTMLElement;
	@State() prop: any;

	render() {
		return (
			<div>
				<label><input type="checkbox" ></input>checkbox for {this.for} ({this.prop.type})</label>
			</div>
		);
	}

	componentWillLoad() {
    this.prop = this.schema.properties[this.for];
    if (this.prop.type !== 'boolean') {
      console.warn('component should not accept', this.for, this.prop)
    }
	}
}
