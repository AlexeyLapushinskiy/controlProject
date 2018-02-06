import { Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';
import * as Pikaday from 'pikaday/pikaday';

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
	@Prop() elementFormat: any;

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

	    let content = <input class="form-control" id={this.id} type={this.for === "integer" ? "number" : "text"} value={this.currentValue} onInput={() => this.getAndPostTextValue(event)} />;

	    if (this.elementFormat) {
	        console.log("datepicker");
          const picker = new Pikaday({
              field: document.getElementById('datepicker'),
              format: 'D MMM YYYY'
          });

            content = <input type={this.for} id="datepicker" value="9 Oct 2014" />;

        }


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
