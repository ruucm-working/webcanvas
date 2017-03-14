import homecss from './css/home.css';
import { Component } from '@angular/core';
import { routerTransition } from './router.animations';

@Component({
	selector: 'my-home',
	template: `
	<div class="myhome">
		<div class="myhome-contents">
			<h2>Hello!</h2>
			<a routerLink="/slider-dashboard"><button>go!</button></a>
		</div>
		<div class="myhome-descriptions">
			<h3>You can use Right, Left, Up, Down key to Navigate 😀</h3>
		</div>
	</div>
	`,
	homecss,
	animations: [routerTransition()],
	host: {'[@routerTransition]': ''},
})
export class HomeComponent {

}