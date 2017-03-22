import template from './slider-dashboard.component.html';
import fullpagecss from 'fullpage.js/dist/jquery.fullpage.css';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from './router.animations';
import { AuthenticationService } from './_simple_login/authentication.service'
import { Page01Service } from './_mojs_services/page01.service';
import myGlobals = require('./globals');

@Component({
	selector: 'my-slider-dashboard',
	template: template,
	styles: [ `` ],
	fullpagecss,
	animations: [routerTransition()],
	host: {'[@routerTransition]': ''},
	providers: [ AuthenticationService, Page01Service ]
})
export class SliderDashboardComponent implements OnInit, OnDestory, OnChanges {
	constructor(
		private _service:AuthenticationService,
		private _service2:Page01Service ) { }
	ngOnInit() {
		console.log('On Init Slider Dashboard');
		this._service2.anim_init();
		this._service2.play_page01_anim();
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
				onLeave: function(index, nextIndex, direction){
					var leavingSection = $(this);
					if(index == 1){
						myGlobals.polygon.stop();
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
