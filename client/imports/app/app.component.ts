import template from './app.component.html';
import fontawesome from 'fontawesome/css/font-awesome.css';
import froala_editor_css from 'froala-editor/css/froala_editor.pkgd.min.css';
import material_indigo_theme from '@angular/material/core/theming/prebuilt/indigo-pink';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WordsComponent } from './_word/words.component';
import { SectionService } from './section.service';
import {
	Router,
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
	providers: [ WordsComponent, SectionService ]
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
	ngOnInit() {
		/* Set Soft Full Screen for ios Safari */
		var timeout;

		window.addEventListener('scroll', function(ev) {

			if (timeout) {
				clearTimeout(timeout);
			}

			timeout = setTimeout(function() {

				if (window.scrollY > 0) {
					var cover = document.querySelector('div.spacer');
					cover.style.display = 'none';
				}

			}, 200);

		});
	}
	navigationInterceptor(event: RouterEvent): void {
		if (event.url == '/' || event.url == '/home') {
			this.remove_loading_screen();
		}
	}
	remove_loading_screen() {
		setTimeout(function(){ $(".loading-screen-1").addClass("loading_end"); }, 2100);
	}
}
