import { Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';
import * as Pikaday from 'pikaday/pikaday.js';

@Component({
	tag: 'my-input',
	shadow: true,
  styleUrl: '../../../node_modules/bootstrap/dist/css/bootstrap.css'
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
	@Prop() format: any;

  getAndPostTextValue (event) {
    if(event.currentTarget.value) {
      this.for === "integer" ? this.currentValue = JSON.parse(event.currentTarget.value) : this.currentValue = event.currentTarget.value;
    } else {
      this.currentValue = null;
    }
    this.postValue.emit(this.element);
  };

  getContent() {
    let content =
      <input class="form-control" id={this.id} type={this.for === "integer" ? "number" : "text"} value={this.currentValue} onInput={() => this.getAndPostTextValue(event)} />;
    if(this.format !== null) {
      content =
        <input class="form-control" id={this.id} type={this.for === "integer" ? "number" : "text"} onInput={() => this.getAndPostTextValue(event)} />;
    }
    return content;
  };

  componentWillLoad() {
    this.currentValue = this.value ? JSON.parse(this.value): "";
    if(this.for === "integer") {
      this.currentValue = this.value || null;
    }
  };

  componentDidLoad() {
    if(this.format !== null) {
      let picker = new Pikaday({ field: this.element.shadowRoot.querySelector("input") });
    }
  };

	render() {

	  let content = this.getContent();

    return (
			<div class="form-group">
        <label>
          {this.title}<br/>
          {content}<br/><br/>
        </label>
			</div>
		);
	}
}
