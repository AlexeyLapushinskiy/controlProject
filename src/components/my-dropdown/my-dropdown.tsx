import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'my-dropdown',
	shadow: true
})
export class MyDropdown {
  @Prop() for: string;

	mapping: Object = {};

	render() {
		return (
			<div class="form-group">
        <label>The Array Schema</label><br/>
        <select class="form-control">
          <option>source1</option>
          <option>source2</option>
        </select><br/><br/>
			</div>
		);
	}
}
