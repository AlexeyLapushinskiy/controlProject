import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-text-input-array',
	shadow: true
})
export class MyTextInputArray {
	@Prop() id: string;
	@Prop() for: string;
	@Prop() value: string;
	@Prop() title: string;

	render() {
		return (
			<div>
        {this.title}<br/>
        <my-dropdown id={this.id} value={this.value}></my-dropdown> <br/><br/>
			</div>
		);
	}
}
