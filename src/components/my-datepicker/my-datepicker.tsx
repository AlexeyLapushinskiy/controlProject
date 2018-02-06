import { Component, Prop, Event, EventEmitter, Element, State } from '@stencil/core';
import * as Pikaday from 'pikaday/pikaday';


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

      const picker = new Pikaday({
        field: document.getElementById('datepicker'),
        format: 'D MMM YYYY'
      });

	  const parsedValue = this.value ? this.value : false;

		return (
		    <div>
                <input type={this.for} id="datepicker" value="9 Oct 2014" />
            </div>
		);
	}
}
