import { Injectable } from '@angular/core';
import myGlobals = require('../globals');

@Injectable()
export class Page01Service {
	constructor(
	) { }
	ngOnInit() {
		console.log('ngOnInit at page01 service');
	}
	anim_init() {
		console.log('anim_init');
		myGlobals.polygon = new mojs.Shape({
			shape:        'polygon',
			points:       5,
			left:         '75%',
			fill:         { 'deeppink' : '#00F87F' },
			x:            { 'rand(-100%, -200%)' : 0  },
			angle:        { 0: 'rand(0, 360)' },
			radius:       25,

			duration:     2000,
			repeat:       999,
		});
	}
	play_page01_anim() {
		console.log('start_page01_anim');
		myGlobals.polygon.play();
	}
	stop_page01_anim() {
		console.log('stop_page01_anim');
		myGlobals.polygon.stop();
	}
}
