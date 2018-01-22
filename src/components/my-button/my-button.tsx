import {Component, Element, Event, EventEmitter, Prop} from '@stencil/core';

@Component({
	tag: 'my-button',
	shadow: true
})
export class MyButton {
  @Event() validateForm: EventEmitter;
  @Element()
  element: HTMLElement;

  @Prop() for: string;
  @Prop() allTitles: any;

	render() {
		return (
		  <div>
        <input class="btn btn-lg btn-primary" type="submit" value="Validate" onClick={() => this.validateForm.emit()} />
      </div>
		);
	}
}
