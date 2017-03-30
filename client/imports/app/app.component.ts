import template from './app.component.html';
import style from './app.component.css';
import fontawesome from 'fontawesome/css/font-awesome.css';
import froala_editor_css from 'froala-editor/css/froala_editor.pkgd.min.css';
import material_indigo_theme from '@angular/material/core/theming/prebuilt/indigo-pink';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { WordsComponent } from './_word/words.component';

@Component({
	selector: 'my-app',
	template: template,
	style, material_indigo_theme, froala_editor_css,
	providers: [ WordsComponent ]
})
export class MyCanvas {
	master: string = 'Master';

	constructor( 
		private translate: TranslateService, 
		private router: Router,
		private _service: WordsComponent ) {
		translate.addLangs(["en", "kr"]);
		translate.setDefaultLang('en');
		let browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|kr/) ? browserLang : 'en');
		router.events.forEach((event) => {
			console.log('event.url(on routin.moudle) : ' + event.url);
			if (event.url == "/post/1") {
				// console.log('post 1');
				// router.navigate(['slider-dashboard']);
				// _service.test_func();
			}
		});
	}
}
