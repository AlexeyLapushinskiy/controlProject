import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-checkbox',
	shadow: true
})
export class MyCheckbox {
	@Prop() for: string;

  checkWatcher(event: any) {
    if(event.currentTarget.getAttribute("checked") === "true") {
      event.currentTarget.setAttribute("checked", "false");
    } else {
      event.currentTarget.setAttribute("checked", "true");
    }
  };

	render() {
		return (
			<div>
        <br/><br/>
				<label>
          checkbox for {this.for}
					<input type="checkbox" id="check-schema" onClick={this.checkWatcher} /><br/><br/>
				</label>
			</div>
		);
	}
}
