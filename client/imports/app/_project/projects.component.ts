import { Component, Input } from '@angular/core';

@Component({
	selector: 'my-projects',
	template: `
	<div class="myprojects" [ngClass]="isloadingEnd()">
	</div>
	`
})
export class ProjectsComponent {
	@Input('loading_end') loading_end;
	ngOnInit() {
	}
	isloadingEnd() {
		if (this.loading_end)
			return 'loading_end';
		else
			return 'loading';
	}
}