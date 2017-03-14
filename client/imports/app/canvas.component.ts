import { Component } from '@angular/core';

@Component({
	selector: 'my-canvas',
	template: `
	<div class="mycanvas">
		<h2>Hello Canvas!</h2>
	</div>
	`,
	styles: [ `
	.mycanvas {
		height: 100%;
		position: absolute;
		width: 100%;
		background: pink;
	}` ],
})
export class CanvasComponent {

}