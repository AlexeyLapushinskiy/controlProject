import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-text-input',
	shadow: true
})
export class MyTextInput {
	@Prop() for: string;

	typeWatcher(event: any) {
	  console.log(event.target.value);
  };

  nameWatcher(event: any) {
    console.log(event.target.value);
  };

	render() {
		return (
			<div>
        <label>
          {this.for}<br/>
				  <input type="text" /><br/><br/>
        </label>
			</div>
		);
	}
}
