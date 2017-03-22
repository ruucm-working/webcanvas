import { Injectable } from '@angular/core';
import myGlobals = require('../globals');

@Injectable()
export class Canvas0218Service {
	constructor(
	) { }
	ngOnInit() {
		console.log('ngOnInit at page01 service');
	}
	anim_init() {
		console.log('anim_init');
		myGlobals.global_timeline = new mojs.Timeline();
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
		const COLORS = {
			RED:		'#FD5061',
			YELLOW:	'#FFCEA5',
			BLACK:	'#29363B',
			WHITE:	'white',
			VINOUS:	'#A50710',
			CYAN:		'cyan',
		}
		const burst3 = new mojs.Burst({
			left: 'rand(100, 600)', top: 'rand(200, 800)',
			count:    5,
			radius:   { 50: 250 },
			children: {
				fill:   'white',
				shape:  'line',
				stroke: [ COLORS.WHITE, COLORS.VINOUS ],
				strokeWidth: 5, 
				radius: 'rand(30, 60)',
				radiusY: 0,
				scale: { 1: 0 },
				pathScale: 'rand(.5, 1)',
				degreeShift: 'rand(-360, 360)',
				isForce3d: true,
			}
		});
		const burst4 = new mojs.Burst({
			left: 'rand(100, 600)', top: 'rand(200, 800)',
			count:    5,
			radius:   { 50: 250 },
			children: {
				fill:   'white',
				shape:  'line',
				stroke: [ COLORS.RED, COLORS.CYAN ],
				strokeWidth: 5, 
				radius: 'rand(30, 60)',
				radiusY: 0,
				scale: { 1: 0 },
				pathScale: 'rand(.5, 1)',
				degreeShift: 'rand(-360, 360)',
				isForce3d: true,
			}
		});
		const burst5 = new mojs.Burst({
			left: 'rand(100, 600)', top: 'rand(200, 800)',
			count:    5,
			radius:   { 50: 250 },
			children: {
				fill:   'white',
				shape:  'line',
				stroke: [ COLORS.YELLOW, 'blue' ],
				strokeWidth: 5, 
				radius: 'rand(30, 60)',
				radiusY: 0,
				scale: { 1: 0 },
				pathScale: 'rand(.5, 1)',
				degreeShift: 'rand(-360, 360)',
				isForce3d: true,
			}
		});
		const busrttimeline01 = new mojs.Timeline({ repeat: 999, delay: 1600 });
		busrttimeline01.add( burst3 );
		const busrttimeline02 = new mojs.Timeline({ speed: 0.3, repeat: 999, delay: 1000 });
		busrttimeline02.add( burst4 );
		const busrttimeline03 = new mojs.Timeline({ repeat: 999, delay: 800 });
		busrttimeline03.add( burst5 );
		myGlobals.burst_0218_page02 = new mojs.Timeline();
		myGlobals.burst_0218_page02.add( busrttimeline01, busrttimeline02, busrttimeline03 );

		this.add_to_global_timeline();
	}
	add_to_global_timeline() {
		myGlobals.global_timeline.add( myGlobals.polygon, myGlobals.burst_0218_page02 );
	}
	// play_page01_anim() {
	// 	console.log('start_page01_anim');
	// 	myGlobals.polygon.play();
	// }
	// stop_page01_anim() {
	// 	myGlobals.polygon.stop();
	// }
}
