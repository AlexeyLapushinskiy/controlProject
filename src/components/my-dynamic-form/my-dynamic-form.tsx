import { Element, Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-dynamic-form',
	shadow: true
})
export class MyDynamicForm {
	@Element() el: HTMLElement;
	@Prop() schema: any;

	mapping: Object = {};

	render() {
		return (
			<div>
				dynamic form

				{Object.keys(this.schema.properties).map((key: any) => {
				  if(key.hasOwnProperty("properties")) {
            Object.keys(key).map ((keyProp) => {
              let { type } = key[keyProp];
              console.log(keyProp, type, this.mapping[type]);
              let Tag = this.mapping[type];
              return <Tag for={keyProp} />;
            })
          }
					let { type } = this.schema.properties[key];
					console.log(key, type, this.mapping[type]);
					let Tag = this.mapping[type];
					return <Tag for={key} />;
				})}
			</div>
		);
	}

	componentWillLoad() {
		for (var i = 0; i < this.el.children.length; i++) {
			let child = this.el.children[i];
			let mapKey = child['for'];
			let mapValue = child['localName'];
			this.mapping[mapKey] = mapValue;
		}

		console.log(this.mapping);
	}
}
