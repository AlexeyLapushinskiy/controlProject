import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-checkbox',
	shadow: true
})
export class MyCheckbox {
	@Prop() for: string;

  checkWatcher(event: any) {
    // let checkbox = document.getElementById("check");
    // console.log(checkbox);
    // let checkboxAttribut = checkbox.getAttribute("checked");
    // checkboxAttribut === "checked" ? console.log("checked") : console.log("unchecked");
  };

	render() {
		return (
			<div>
        <br/><br/>
				<label>
          checkbox for {this.for}
					<input type="checkbox" id="check" onClick={this.checkWatcher} /><br/><br/>
				</label>
			</div>
		);
	}
}
