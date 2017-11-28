import { Element, Component, Prop } from '@stencil/core';
import { MyCheckbox } from '../my-checkbox/my-checkbox';

@Component({
	tag: 'my-dynamic-form',
	shadow: true
})
export class MyDynamicForm {
	@Element() el: HTMLElement;
	@Prop() schema: Object = {};

	render() {
		return (
			<div>
				dynamic form {this.schema}
				<slot />
			</div>
		);
	}

	componentWillLoad() {

		for (var i = 0; i < this.el.children.length; i++) {
			let child = this.el.children[i];

			child['schema'] = this.schema;
		}
	}
}
