import { Component, Prop, State, Event, EventEmitter, Element, Listen } from '@stencil/core';

@Component({
	tag: 'my-text-input',
	shadow: true
})
export class MyTextInput {

  @State() currentValue: string;

  @Event() postValue: EventEmitter;
  @Element()
  element: HTMLElement;

  @Prop() id: string;
	@Prop() for: string;
	@Prop() value: string;
	@Prop() title: string;

  getAndPostTextValue (event) {
    if(event.currentTarget.value) {
      this.currentValue = event.currentTarget.value;
    } else {
      this.currentValue = null;
    }
    this.postValue.emit(this.element);
  };

  componentWillLoad() {
    // console.log("my-text-input");
    // console.log(this.for);
    this.currentValue = this.value ? JSON.parse(this.value): "";
  };

	render() {

    return (
			<div>
        <label>
          {this.title}<br/>
				  <input id={this.id} type="text" value={this.currentValue} onInput={() => this.getAndPostTextValue(event)} /><br/><br/>
        </label>
			</div>
		);
	}
}
