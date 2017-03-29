import template from './home.component.html';
import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { routerTransition } from './router.animations';
import { AuthenticationService } from './_simple_login/authentication.service'
import { TranslateService } from '@ngx-translate/core';
import myGlobals = require('../globals');
import { Meteor } from 'meteor/meteor';

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
		@Inject(DOCUMENT) private document: Document,
		private _service:AuthenticationService,
		private translate: TranslateService
	) { }
	logout() {
		this._service.logout('home');
	}
	change_lang(value) {
		this.translate.use(value);
	}
	@HostListener("window:scroll", [])
	onWindowScroll() {
		console.log('onWindowScroll');
		let number = this.document.body.scrollTop;
		if (number > 100) {
			// this.navIsFixed = true;
		}
	}
}
