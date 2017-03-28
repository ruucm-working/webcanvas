import template from './slider-dashboard.component.html';
import fullpagecss from 'fullpage.js/dist/jquery.fullpage.css';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from './router.animations';
import { AuthenticationService } from './_simple_login/authentication.service'
import myGlobals = require('./globals');

@Component({
	selector: 'my-slider-dashboard',
	template: template,
	styles: [ `` ],
	fullpagecss,
	animations: [routerTransition()],
	host: {'[@routerTransition]': ''},
	providers: [ AuthenticationService ]
})
export class SliderDashboardComponent implements OnInit, OnDestory, OnChanges {
	constructor(
		private _service:AuthenticationService ) {
	}

	ngOnInit() {
		$( document ).ready(function() {
			if($('html').hasClass('fp-enabled')){
			    $.fn.fullpage.destroy('all');
			}
			$('#fullpage').fullpage({
			 	//Navigation
				menu: '#menu',
				lockAnchors: false,
				anchors:['CanvasPage', 'ProjectPage', 'WordPage'],
				navigation: true,
				navigationPosition: 'right',
				navigationTooltips: ['Canvas', 'Project', 'Word'],
				showActiveTooltip: true,
				slidesNavigation: true,
				slidesNavPosition: 'top',
				sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', '#F5E0E0', '#000'],
				controlArrows: false,
			});
		});
	}
	logout() {
		this._service.logout();
	}
	ngOnDestroy() {
		console.log('On Destory Slider Dashboard');
		if($('html').hasClass('fp-enabled')){
			$.fn.fullpage.destroy('all');
		}
	}
}
