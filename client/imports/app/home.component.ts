import template from './home.component.html';
import { Component } from '@angular/core';
import { routerTransition } from './router.animations';
import { AuthenticationService } from './_simple_login/authentication.service'
import { CanvasTitleService } from './_mojs_services/canvas-title.service';
import { TranslateService } from '@ngx-translate/core';
import myGlobals = require('../globals');

@Component({
	selector: 'my-home',
	template: template,
	animations: [routerTransition('left')],
	host: {'[@routerTransition]': ''},
	providers: [ AuthenticationService, CanvasTitleService ]
})
export class HomeComponent {
	newText = '';
	foods = [
	    {value: 'steak-0', viewValue: 'Steak'},
	    {value: 'pizza-1', viewValue: 'Pizza'},
	    {value: 'tacos-2', viewValue: 'Tacos'}
	];
	constructor(
		private _service:AuthenticationService,
		private _service2:CanvasTitleService,
		private translate: TranslateService
	){
		translate.addLangs(["en", "kr"]);
		translate.setDefaultLang('en');

		let browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|kr/) ? browserLang : 'en');
		console.log('translate.currentLang : ' + translate.currentLang);
	}
	logout() {
		this._service.logout('home');
	}
	route_test() {
		this._service.route_test();
	}
	ngOnInit() {
		this._service2.canvas_title_anim_init();
		$( document ).ready(function() {
			const click_burst = new mojs.Burst({
				left: 0, top: 0,
				radius: { 0: 300 },
				count: 3,
				degree: 30,
				angle: { 0: 60 },
				opacity: { 1: 0 },
				children: {
					fill: { 'cyan' : 'yellow' },
					radius:       20,
					duration: 5000
				},
			});
			document.addEventListener( 'click', function (e) {
				click_burst
					.tune({ x: e.pageX, y: e.pageY })
					.setSpeed(3)
					.replay();
				});
		});
	}
	change_lang(value) {
		this.translate.use(value);
	}
}
