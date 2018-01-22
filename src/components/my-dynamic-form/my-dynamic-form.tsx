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
   * Object for all properties of the JSON-schema'.
   */

	mapping: Object = {};

  /**
   * Function for getting fields based on properties of properties in JSON-schema.
   */

  getFirstProps(propsKeyProps, key, keyProp) {
    let { type } = propsKeyProps[keyProp];
    let Tag = this.mapping[type];
    let title = propsKeyProps[keyProp].title;
    this.allTitles[keyProp] = title;
    return this.form[key].hasOwnProperty(keyProp) ? <Tag for={keyProp} value={JSON.stringify(this.form[key][keyProp])} title={title} /> : null;
  };

  /**
   * Function for getting fields based on properties in JSON-schema.
   */

  getSecondProps(props, key) {
    let { type } = props[key];
    let Tag = this.mapping[type];
    let title: string = props[key].title;
    this.allTitles[key] = title;
    if(!title) {
      props[key].items ? title = props[key].items.title : title = 'Unnamed field';
      this.allTitles[key] = title;
    }
    if (key === "button") {
      return this.form.hasOwnProperty(key) ? <Tag for={key} value={JSON.stringify(this.form[key])} title={title} allTitles={this.allTitles} /> : null;
    }
    return this.form.hasOwnProperty(key) ? <Tag for={key} value={JSON.stringify(this.form[key])} title={title} /> : null;
  };

	render() {

    /**
     * Creating form fields and saving it to the let form.
     */

	  let form: any = Object.keys(this.schema.properties).map((key: any) => {
      let props: any = this.schema.properties;
      if(props[key].properties) {
        return Object.keys(props[key].properties).map ((keyProp: any) => {
          let propsKeyProps: any = props[key].properties;
          return this.getFirstProps(propsKeyProps, key, keyProp);
        })
      } else {
        return this.getSecondProps(props, key);
      }
    });

		return (
        <div>
          {form}
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
