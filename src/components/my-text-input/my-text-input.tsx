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
          {this.for} <br/>
				  <input type="text" onInput={this.for === "type" ? this.typeWatcher : this.nameWatcher} /><br/><br/>
        </label>
			</div>
		);
	}
}
