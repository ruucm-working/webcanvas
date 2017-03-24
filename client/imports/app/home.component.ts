import template from './home.component.html';
import { Component } from '@angular/core';
import { routerTransition } from './router.animations';
import { AuthenticationService } from './_simple_login/authentication.service'
import { Canvas0218Service } from './_mojs_services/canvas0218.service';

@Component({
	selector: 'my-home',
	template: template,
	animations: [routerTransition('left')],
	host: {'[@routerTransition]': ''},
	providers: [ AuthenticationService, Canvas0218Service ]
})
export class HomeComponent {
	newText = '';
	constructor(
		private _service:AuthenticationService,
		private _service2:Canvas0218Service,
		){}
	logout() {
		this._service.logout('home');
	}
	route_test() {
		this._service.route_test();
	}
	ngOnInit() {
		this._service2.first_page_anim_init();
	}
}
