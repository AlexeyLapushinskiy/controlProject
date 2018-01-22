import { Element, Component, Prop, State } from '@stencil/core';

@Component({
	tag: 'my-dynamic-form',
	shadow: true
})
export class MyDynamicForm {

  @State() allTitles: any = {};

  /**
   * @Prop {any} schema - JSON-schema.
   * @Prop {any} form - form for JSON-schema.
   */

	@Element() el: HTMLElement;
	@Prop() schema: any;
	@Prop() form: any;

  /**
   * @Object {Object} mapping - object for all properties of the JSON-schema'.
   */

	mapping: Object = {};

	render() {

		return (
        <div>
          {
            Object.keys(this.schema.properties).map((key: any) => {
            if(this.schema.properties[key].properties) {
              return Object.keys(this.schema.properties[key].properties).map ((keyProp: any) => {
                let { type } = this.schema.properties[key].properties[keyProp];
                let Tag = this.mapping[type];
                let title = this.schema.properties[key].properties[keyProp].title;
                this.allTitles[keyProp] = title;
                return this.form[key].hasOwnProperty(keyProp) ? <Tag for={keyProp} value={JSON.stringify(this.form[key][keyProp])} title={title} /> : null;
              })
            } else {
              let { type } = this.schema.properties[key];
              let Tag = this.mapping[type];
              let title: string = this.schema.properties[key].title;
              this.allTitles[key] = title;
              if(!title) {
                this.schema.properties[key].items ? title = this.schema.properties[key].items.title : title = 'Unnamed field';
                this.allTitles[key] = title;
              }
              if (key === "button") {
                return this.form.hasOwnProperty(key) ? <Tag for={key} value={JSON.stringify(this.form[key])} title={title} allTitles={this.allTitles} /> : null;
              }
              return this.form.hasOwnProperty(key) ? <Tag for={key} value={JSON.stringify(this.form[key])} title={title} /> : null;
              }
            })
           }
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
	}
}
