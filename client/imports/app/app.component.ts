import template from './app.component.html';
import style from './app.component.css';
import fontawesome from 'fontawesome/css/font-awesome.css';
import froala_editor_css from 'froala-editor/css/froala_editor.pkgd.min.css';
import material_indigo_theme from '@angular/material/core/theming/prebuilt/indigo-pink';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'my-app',
	template: template,
	style, material_indigo_theme, froala_editor_css,
})
export class MyCanvas {
	constructor( private translate: TranslateService ) {
		translate.addLangs(["en", "kr"]);
		translate.setDefaultLang('en');
		let browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|kr/) ? browserLang : 'en');
	}
	ngOnInit() {
		console.log('On Init app.component');
		$( document ).ready(function() {
			// const click_burst = new mojs.Burst({
			// 	left: 0, top: 0,
			// 	radius: { 0: 300 },
			// 	count: 3,
			// 	degree: 30,
			// 	angle: { 0: 60 },
			// 	opacity: { 1: 0 },
			// 	children: {
			// 		fill: { 'cyan' : 'yellow' },
			// 		radius:       20,
			// 		duration: 5000
			// 	},
			// });
			// console.log('click_burst in app.component');
			// document.addEventListener( 'click', function (e) {
			// 	click_burst
			// 		.tune({ x: e.pageX, y: e.pageY })
			// 		.setSpeed(3)
			// 		.replay();
			// });
		});
	}
}
