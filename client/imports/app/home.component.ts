import template from './home.component.html';
import { Component } from '@angular/core';
import { routerTransition } from './router.animations';
import { AuthenticationService } from './_simple_login/authentication.service'

@Component({
	selector: 'my-home',
    providers: [AuthenticationService],
	template: template,
	animations: [routerTransition('left')],
	host: {'[@routerTransition]': ''},
})
export class HomeComponent {
	constructor(
		private _service:AuthenticationService){}
	logout() {
		this._service.logout('home');
	}
	route_test() {
		this._service.route_test();
	}
}
