import { Component } from '@angular/core';
import { routerTransition } from './router.animations';

@Component({
	selector: 'my-home',
	template: `
	<div class="myhome">
		<h2>Hello!</h2>
	</div>
	`,
	styles: [ `
	.myhome {
		height: 100%;
		position: absolute;
		width: 100%;
		background: lightblue;
	}` ],
	animations: [routerTransition()],
	host: {'[@routerTransition]': ''}
})
export class HomeComponent {

}