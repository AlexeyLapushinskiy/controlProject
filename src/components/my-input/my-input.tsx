import { Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';

@Component({
	tag: 'my-input',
	shadow: true
})
export class MyInput {

  @State() currentValue: string;

  @Event() postValue: EventEmitter;
  @Element()
  element: HTMLElement;

  @Prop() id: string;
	@Prop() for: string;
	@Prop() value: any;
	@Prop() title: string;

  getAndPostTextValue (event) {
    if(event.currentTarget.value) {
      this.for === "integer" ? this.currentValue = JSON.parse(event.currentTarget.value) : this.currentValue = event.currentTarget.value;
    } else {
      this.currentValue = null;
    }
    this.postValue.emit(this.element);
  };

  componentWillLoad() {
    this.currentValue = this.value ? JSON.parse(this.value): "";
    if(this.for === "integer") {
      this.currentValue = this.value || null;
    }
  };

	render() {

    return (
			<div>
        <label>
          {this.title}<br/>
				  <input id={this.id} type={this.for === "integer" ? "number" : "text"} value={this.currentValue} onInput={() => this.getAndPostTextValue(event)} /><br/><br/>
        </label>
			</div>
		);
	}
}
