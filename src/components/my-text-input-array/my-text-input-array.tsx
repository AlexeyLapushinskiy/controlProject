import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-text-input-array',
	shadow: true
})
export class MyTextInputArray {
	@Prop() for: string;
	@Prop() value: string;
	@Prop() title: string;


	render() {
		return (
			<div>
        {this.title}<br/>
        <my-dropdown value={this.value}></my-dropdown> <br/><br/>
			</div>
		);
	}
}
