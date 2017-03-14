import { Component } from '@angular/core';

@Component({
	selector: 'my-projects',
	template: `
	<div class="myprojects">
		<h2>Hello Projects!</h2>
	</div>
	`,
	styles: [ `
	.myprojects {
		height: 100%;
		position: absolute;
		width: 100%;
		background: yellow;
	}` ],
})
export class ProjectsComponent {

}