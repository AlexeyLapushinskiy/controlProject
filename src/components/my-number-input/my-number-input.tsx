import { Component, Prop, Event, EventEmitter, Element, State } from '@stencil/core';

@Component({
	tag: 'my-number-input',
	shadow: true
})
export class NumberInput {

  @State() currentValue: number;
  @State() flagForChange: boolean = false;

  @Event() postValue: EventEmitter;
  @Element()
  element: HTMLElement;

  @Prop() id: string;
  @Prop() for: string;
  @Prop() value: number;
  @Prop() title: string;

  getAndPostNumberValue (event) {
    this.flagForChange = true;
    if(event.currentTarget.value) {
      this.currentValue = JSON.parse(event.currentTarget.value);
    } else {
      this.currentValue = null;
    }
    this.postValue.emit(this.element);
  };

	render() {

		return (
			<div id={this.id}>
        <label>
          {this.title}<br/>
          <input id={this.id} value={this.currentValue || this.value} type="number" onInput={() => this.getAndPostNumberValue(event)} /><br/><br/>
        </label>
			</div>
		);
	}
}
