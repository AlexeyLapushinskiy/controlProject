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

  @Prop() for: string;
  @Prop() value: string;
  @Prop() title: string;

  getSelectValues(event) {
    console.log("event.currentTarget.value");
    console.log(event.currentTarget.value);
    this.currentValue = event.currentTarget.value;
    this.postValue.emit(this.element);
  };

	render() {
    const parsedValue = this.value ? JSON.parse(this.value): null;

    return (
        <select value={this.currentValue} onClick={() => this.getSelectValues(event)}>
          {parsedValue && parsedValue.map((value) =>
            <option>{value}</option>
          )}
        </select>
		);
	}
}
