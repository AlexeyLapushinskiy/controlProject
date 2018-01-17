import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-button',
	shadow: true
})
export class MyButton {
  @Prop() for: string;

  validateForm() {

    // let addSchema = ajv.addSchema(schema);
    // let validate = ajv.compile(schema);

  };

	render() {
		return (
			<div>
        <input type="submit" value="Validate" onClick={this.validateForm} />
			</div>
		);
	}
}
