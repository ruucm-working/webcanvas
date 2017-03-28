import { Component } from '@angular/core';

@Component({
	selector: 'my-projects',
	template: `
	<div class="myprojects">
		<h2>Project</h2>
		<h3>🚦Construction Mode🚦</h3>
	</div>
	`,
	styles: [ `
	.myprojects {
		height: 100%;
		width: 100%;
		background: yellow;
	}` ],
})
export class ProjectsComponent {
	ngOnInit() {
	}
}