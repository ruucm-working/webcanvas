import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { routerTransition } from './router.animations';
import { AuthenticationService } from './_simple_login/authentication.service'
import { TranslateService } from '@ngx-translate/core';
import { SliderDashboardComponent } from '../slider-dashboard.component';
import { Meteor } from 'meteor/meteor';
import myGlobals = require('../globals');
import template from './home.component.html';

@Component({
	selector: 'my-home',
	template: template,
	animations: [routerTransition('left')],
	host: {'[@routerTransition]': ''},
	providers: [ AuthenticationService ]
})
export class HomeComponent {
	home_words;
	constructor(
		private _service:AuthenticationService,
		private translate: TranslateService
	){}
	logout() {
		this._service.logout('home');
	}
	change_lang(value) {
		this.translate.use(value);
	}
}
