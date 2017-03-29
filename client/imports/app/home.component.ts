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
	ngOnInit() {
		this._service2.canvas_title_anim_init();
	}
	change_lang(value) {
		this.translate.use(value);
	}
}
