import { Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';

@Component({
	tag: 'my-dropdown',
	shadow: true
})
export class MyDropdown {

  @State() currentValue: string;

  @Event() postValue: EventEmitter;
  @Element()
  element: HTMLElement;

  @Prop() id: string;
  @Prop() for: string;
  @Prop() value: string;
  @Prop() title: string;

  getSelectValues(event) {
    this.currentValue = event.currentTarget.value;
    this.postValue.emit(this.element);
  };

	render() {
    const parsedValue = this.value ? JSON.parse(this.value): null;

    return (
        <select id={this.id} value={this.currentValue} onClick={() => this.getSelectValues(event)}>
          {parsedValue && parsedValue.map((value) =>
            <option>{value}</option>
          )}
        </select>
		);
	}
}
