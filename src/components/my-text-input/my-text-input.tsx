import { Component, Prop, State, Event, EventEmitter, Element, Listen } from '@stencil/core';

@Component({
	tag: 'my-text-input',
	shadow: true
})
export class MyTextInput {

  @State() currentValue: string;
  @State() flagForChange: boolean = false;

  @Event() postValue: EventEmitter;
  @Element()
  element: HTMLElement;

  @Prop() id: string;
	@Prop() for: string;
	@Prop() value: string;
	@Prop() title: string;

  getAndPostTextValue (event) {
    this.flagForChange = true;
    if(event.currentTarget.value) {
      this.currentValue = event.currentTarget.value;
    } else {
      this.currentValue = null;
    }
    this.postValue.emit(this.element);
  };

	render() {
    const parsedValue = this.value ? JSON.parse(this.value): '';

    return (
			<div  class="form-group">
        <label>
          {this.title}<br/>
				  <input id={this.id} type="text" value={this.currentValue || parsedValue} onInput={() => this.getAndPostTextValue(event)} /><br/><br/>
        </label>
			</div>
		);
	}
}
