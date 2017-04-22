import template from './app.component.html';
import fontawesome from 'fontawesome/css/font-awesome.css';
import froala_editor_css from 'froala-editor/css/froala_editor.pkgd.min.css';
import material_indigo_theme from '@angular/material/core/theming/prebuilt/indigo-pink';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WordsComponent } from './_word/words.component';
import {
	Router,
	// import as RouterEvent to avoid confusion with the DOM Event
	Event as RouterEvent,
	NavigationStart,
	NavigationEnd,
	NavigationCancel,
	NavigationError
} from '@angular/router'

@Component({
	selector: 'my-app',
	template: template,
	material_indigo_theme, froala_editor_css,
	providers: [ WordsComponent ]
})
export class MyCanvas {

	constructor( 
		private translate: TranslateService, 
		private _service: WordsComponent,
		private router: Router ) {
		translate.addLangs(["en", "kr"]);
		translate.setDefaultLang('en');
		let browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|kr/) ? browserLang : 'en');
		router.events.subscribe((event: RouterEvent) => {
			console.log('navigation event at app-component');
			console.log('event.url : ' + event.url);
			this.navigationInterceptor(event);
		});
	}
	navigationInterceptor(event: RouterEvent): void {
		if (event.url == '/' || event.url == '/home') {
			this.remove_loading_screen();
		}
		// if (event instanceof NavigationStart) {
		// }
		// if (event instanceof NavigationEnd) {
		// }
		// if (event instanceof NavigationCancel) {
		// 	setTimeout(function(){ $(".loading").addClass("loading_end"); }, 2100);
		// }
		// if (event instanceof NavigationError) {
		// 	setTimeout(function(){ $(".loading").addClass("loading_end"); }, 2100);
		// }
	}
	remove_loading_screen() {
		setTimeout(function(){ $(".loading-screen-1").addClass("loading_end"); }, 2100);
	}
}
