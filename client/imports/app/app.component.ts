import template from './app.component.html';
import style from './app.component.css';
import fontawesome from 'fontawesome/css/font-awesome.css';
import froala_editor_css from 'froala-editor/css/froala_editor.pkgd.min.css';
import material_indigo_theme from '@angular/material/core/theming/prebuilt/indigo-pink';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
		private _service: WordsComponent ) {
		translate.addLangs(["en", "kr"]);
		translate.setDefaultLang('en');
		let browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|kr/) ? browserLang : 'en');
	}
	// ngOnInit() {
	// 	Meteor.startup(function() {

	//   });
	// }
}
