import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { AuthenticationService } from './_simple_login/authentication.service'
import { TranslateService } from '@ngx-translate/core';
import { SliderDashboardComponent } from '../slider-dashboard.component';
import { Meteor } from 'meteor/meteor';
// import { HighlightJsService } from '../src/highlight-js.service'; //in live this would be the node_modules path
import template from './home.component.html';

@Component({
	selector: 'my-home',
	template: template,
	providers: [ AuthenticationService ],
	// directives: [Codeblock, Ruby]
})
export class HomeComponent {
	home_words;
	sampleContent = `
         <pre>
            <code class="typescript highlight">
                class Greeter {
                    constructor(public greeting: string) { }
                    greet() {
                        return "hello world";
                    }
                };
            </code>
        </pre>
        <pre>
            <code class="javascript highlight">
                alert('Hello, World!');
            </code>
        </pre>
        `;
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
