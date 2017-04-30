import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { AuthenticationService } from '../_simple_login/authentication.service'
import { TranslateService } from '@ngx-translate/core';
import { SliderDashboardComponent } from '../_slider-dashboard/slider-dashboard.component';
import { Meteor } from 'meteor/meteor';
import template from './home.component.html';

@Component({
	selector: 'my-home',
	template: template,
	providers: [ AuthenticationService ],
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
	over() {
		$(".myhome").addClass("strip_background");
	}
	leave() {
		$(".myhome").removeClass("strip_background");
	}
}
