import { Component } from '@angular/core';

@Component({
	selector: 'my-projects',
	template: `
	<div class="myprojects">
		<h2>Project</h2>
		<h3>🍿Construction Mode</h3>
	</div>
	`,
	styles: [ `
	.myprojects {
		width: 100%;
		background: #F9ACB3;
		margin: 30px;
		padding: 6px;
		border-radius: 16px;
	}` ],
})
export class ProjectsComponent {
	ngOnInit() {
	}
}