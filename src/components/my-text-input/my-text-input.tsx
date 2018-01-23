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

	@Prop() for: string;
	@Prop() value: string;
	@Prop() title: string;

  getAndPostTextValue (event) {
    this.flagForChange = true;
    this.currentValue = event.currentTarget.value;
    this.postValue.emit(this.element)
  };

	render() {
    const parsedValue = this.value ? JSON.parse(this.value): '';

    return (
			<div  class="form-group">
        <label>
          {this.title}<br/>
				  <input type="text" value={this.currentValue || (this.flagForChange ? "" : this.value)} onInput={() => this.getAndPostTextValue(event)} /><br/><br/>
        </label>
			</div>
		);
	}
}
