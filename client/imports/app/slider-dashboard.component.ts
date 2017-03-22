import template from './slider-dashboard.component.html';
import fullpagecss from 'fullpage.js/dist/jquery.fullpage.css';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { routerTransition } from './router.animations';
import { AuthenticationService } from './_simple_login/authentication.service'
import { Canvas0218Service } from './_mojs_services/canvas0218.service';
import myGlobals = require('./globals');

@Component({
	selector: 'my-slider-dashboard',
	template: template,
	styles: [ `` ],
	fullpagecss,
	animations: [routerTransition()],
	host: {'[@routerTransition]': ''},
	providers: [ AuthenticationService, Canvas0218Service ]
})
export class SliderDashboardComponent implements OnInit, OnDestory, OnChanges {
	constructor(
		private _service:AuthenticationService,
		private _service2:Canvas0218Service,
		private router: Router ) {
		router.events.forEach((event) => {
			console.log('router event!');
			if (event instanceof NavigationStart) {
				console.log('event : ');
				console.log(event);
				console.log(event.url);
				if (event.url == "/slider-dashboard#firstPage") {
					console.log('I am in');
					myGlobals.global_timeline.play();
				} else
					myGlobals.global_timeline.stop();
			}
			// NavigationEnd
			// NavigationCancel
			// NavigationError
			// RoutesRecognized
		});
	}
	ngOnInit() {
		console.log('On Init Slider Dashboard');
		this._service2.anim_init();
		myGlobals.global_timeline.play();
		console.log('this : ');
		console.log(this);
		$( document ).ready(function() {
			console.log('init');
			if($('html').hasClass('fp-enabled')){
			    $.fn.fullpage.destroy('all');
			}
			$('#fullpage').fullpage({
			 	//Navigation
		        menu: '#menu',
		        lockAnchors: false,
		        anchors:['firstPage', 'secondPage'],
		        navigation: true,
		        navigationPosition: 'right',
		        navigationTooltips: ['firstSlide', 'secondSlide'],
		        showActiveTooltip: true,
		        slidesNavigation: true,
		        slidesNavPosition: 'bottom',
		        sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'red', '#000'],
		        afterLoad: function(anchorLink, index){
		        	console.log('index : ' + index);
		        	//first slide of the second section
					if(index == 1){
						// alert("First slide loaded");
					}
		        },
				onLeave: function(index, nextIndex, direction){
					var leavingSection = $(this);
					if(index == 1){
						myGlobals.global_timeline.stop();
					}
				}
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
