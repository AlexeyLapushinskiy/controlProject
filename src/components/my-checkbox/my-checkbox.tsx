import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-checkbox',
	shadow: true
})
export class MyCheckbox {
	@Prop() for: string;
  @Prop() value: string;
  @Prop() title: string;

  /**
   * Function for changing value of attribute 'checked'.
   */

  checkWatcher(event: any) {
    if(event.currentTarget.getAttribute("checked") === "true") {
      event.currentTarget.setAttribute("checked", "false");
    } else {
      event.currentTarget.setAttribute("checked", "true");
    }
  };

	render() {
	  const parsedValue = this.value ? JSON.parse(this.value): false;

		return (
			<div  class="checkbox">
				<label>
          {this.title}<br/>
					<input type="checkbox" id="check-schema" onClick={this.checkWatcher} checked={parsedValue} /><br/><br/>
				</label>
			</div>
		);
	}
}
