import { Component, Prop, Event, EventEmitter, Element, State } from '@stencil/core';

@Component({
	tag: 'my-datepicker',
	shadow: true
})
export class MyDatepicker {

  @State() currentValue: boolean = false;

  @Prop() id: string;
  @Prop() for: string;
  @Prop() value: string;
  @Prop() title: string;

  @Event() postValue: EventEmitter;
  @Element()
  element: HTMLElement;

  checkWatcher() {
    this.currentValue ? this.currentValue = false : this.currentValue = true;
    this.postValue.emit(this.element);
  };

	render() {
	  const parsedValue = this.value ? this.value : false;

		return (
		    <div>
                <input type="text" id="datepicker" />
            </div>
		);
	}
}
