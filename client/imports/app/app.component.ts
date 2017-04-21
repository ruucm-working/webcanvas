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
	// Sets initial value to true to show loading spinner on first load
    loading: boolean = true;

	constructor( 
		private translate: TranslateService, 
		private _service: WordsComponent,
		private router: Router ) {
		translate.addLangs(["en", "kr"]);
		translate.setDefaultLang('en');
		let browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|kr/) ? browserLang : 'en');
		router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
	}
	// Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
            // $(".loading").addClass("loading_end");
            setTimeout(function(){ $(".loading").addClass("loading_end"); }, 3000);
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false;
            // $(".loading").addClass("loading_end");
            setTimeout(function(){ $(".loading").addClass("loading_end"); }, 3000);
        }
        if (event instanceof NavigationError) {
            this.loading = false;
            // $(".loading").addClass("loading_end");
            setTimeout(function(){ $(".loading").addClass("loading_end"); }, 3000);
        }
    }
}
