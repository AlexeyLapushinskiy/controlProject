import { Component, Prop, Event, EventEmitter, Element, State } from '@stencil/core';

@Component({
	tag: 'my-number-input',
	shadow: true
})
export class NumberInput {

  @State() currentValue: number;

  @Event() postValue: EventEmitter;
  @Element()
  element: HTMLElement;

  @Prop() id: string;
  @Prop() for: string;
  @Prop() value: number;
  @Prop() title: string;

  getAndPostNumberValue (event) {
    if(event.currentTarget.value) {
      this.currentValue = JSON.parse(event.currentTarget.value);
    } else {
      this.currentValue = null;
    }
    this.postValue.emit(this.element);
  };

  componentWillLoad() {
    this.currentValue = this.value || null;
  };

	render() {

		return (
			<div>
        <label>
          {this.title}<br/>
          <input id={this.id} value={this.currentValue} type="number" onInput={() => this.getAndPostNumberValue(event)} /><br/><br/>
        </label>
			</div>
		);
	}
}
