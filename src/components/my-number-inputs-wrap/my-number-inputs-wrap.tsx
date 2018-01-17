import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-number-inputs-wrap',
	shadow: true
})
export class MyButton {
  @Prop() for: string;

	render() {
		return (
			<div>

			</div>
		);
	}
}

// import { Element, Component, Prop } from '@stencil/core';
//
// @Component({
//   tag: 'my-number-inputs-wrap',
//   shadow: true
// })
// export class MyNumberInputsWrap {
//   @Element() el: HTMLElement;
//   @Prop() schema: any;
//
//   mapping: Object = {};
//
//   render() {
//     return (
//       <div>
//         {Object.keys(this.schema.properties.duration.properties).map((key) => {
//           let { type } = this.schema.properties.duration.properties[key];
//           console.log(key, type, this.mapping[type]);
//           let Tag = this.mapping[type];
//           return <Tag for={key} />;
//         })}
//       </div>
//     );
//   }
//
//   componentWillLoad() {
//     for (var i = 0; i < this.el.children.length; i++) {
//       let child = this.el.children[i];
//       let mapKey = child['for'];
//       let mapValue = child['localName'];
//       this.mapping[mapKey] = mapValue;
//     }
//
//     console.log(this.mapping);
//   }
// }

