import template from './slider-dashboard.component.html';
import fullpagecss from 'fullpage.js/dist/jquery.fullpage.css';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from './router.animations';

@Component({
  selector: 'my-slider-dashboard',
  template: template,
  styles: [ `
	.section {
		padding-left: 80px;
	}` ],
  fullpagecss,
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class SliderDashboardComponent implements OnInit, OnDestory, OnChanges {
	ngOnInit() {
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

	        sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
		});
	}
}