import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-dropdown',
	shadow: true
})
export class MyDropdown {
  @Prop() for: string;
  @Prop() value: string;
  @Prop() title: string;

	render() {
    const parsedValue = this.value ? JSON.parse(this.value): null;

    return (
        <select>
          {parsedValue && parsedValue.map((value) =>
            <option>{value}</option>
          )}
        </select>
		);
	}
}
