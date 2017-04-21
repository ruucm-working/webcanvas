import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { AuthenticationService } from './_simple_login/authentication.service'
import { TranslateService } from '@ngx-translate/core';
import { SliderDashboardComponent } from '../slider-dashboard.component';
import { Meteor } from 'meteor/meteor';
import template from './home.component.html';

@Component({
	selector: 'my-home',
	template: template,
	providers: [ AuthenticationService ]
})
export class HomeComponent {
	home_words;
	constructor(
		private _service:AuthenticationService,
		private translate: TranslateService
	){
		/* Set Soft Full Screen for ios Safari */
		var timeout;
		
		window.addEventListener('scroll', function(ev) {
			if (timeout)
				clearTimeout(timeout);
			timeout = setTimeout(function() {
				if (window.scrollY > 0) {
					var cover = document.querySelector('div.cover');
					cover.style.display = 'none';
				}

			}, 200);

		});
	}
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
