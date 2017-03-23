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
		myGlobals.burst_timeline = new mojs.Timeline();
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
		const busrttimeline02 = new mojs.Timeline({ speed: 0.8, repeat: 999, delay: 1000 });
		busrttimeline02.add( burst4 );
		const busrttimeline03 = new mojs.Timeline({ repeat: 999, delay: 800 });
		busrttimeline03.add( burst5 );
		myGlobals._0218_page02_burst = new mojs.Timeline();
		myGlobals._0218_page02_burst.add( busrttimeline01, busrttimeline02, busrttimeline03 );
		$( document ).ready(function() {
			myGlobals._0218_page01_left_leg = new mojs.Html({
				repeat:   999,
				duration: 1000,
				el: '.gem__leg-left',
				y: { 0: -2, curve: 'M0, 100 C0, 100 1.9274601017238027, -100.72671479853175 50, -100 C50.072539898276204, 15.583857655674608 100, 100 100, 100' },
				angleZ: { 0: 21, curve: 'M0, 100 C0, 100 1.9274601017238027, -100.72671479853175 50, -100 C50.072539898276204, 15.583857655674608 100, 100 100, 100' }
			});
			let CHAR_STEP  = 50;
			const bounceCurve = mojs.easing.path('M0,-100 C0,-100 15.6877613,115.487686 32.0269814,74.203186 C62.0118605,-1.559962 100.057489,-0.0941416292 100.057489,-0.0941416292');
			const nBounceCurve = (p) => { return 2 - bounceCurve(p) };
			Y_SHIFT    = -20;
			X_SHIFT    = CHAR_STEP/2;
			myGlobals._0218_page01_word = new mojs.Html({
				left: '30%', top: '70%',
				fill:         'none',
				radius:       23,
				isShowEnd:    true,
				isForce3d:    true,
				el: '.bottom__text03',
				y: { [Y_SHIFT]: -200 + Y_SHIFT },
				angle: { 0 : -180, easing: 'cubic.in' },
				x: -4*CHAR_STEP + X_SHIFT,
				scaleY: { 1: 1, curve: bounceCurve },
				scaleX: { 1: 1, curve: nBounceCurve },
				easing: 'quad.out',
				delay: 250,
				duration: 350,
			})
			.then({
			  y: Y_SHIFT,
			  angle: { to: -360, easing: 'expo.out' },
			  easing: 'bounce.out',
			  duration: 1000,
			  origin: '50% 100%',
			})
			const character3 = document.createElement('div');
				character3.classList.add( 'character' );
				myGlobals._0218_page01_word.el.appendChild( character3 );
			character3.innerHTML = '카페에 와있다';
			var add_to_global_timeline = function(){
				console.log('add_to_global_timeline');
				myGlobals.burst_timeline.add( myGlobals._0218_page02_burst );
				myGlobals.global_timeline.add( myGlobals._0218_page01_left_leg, myGlobals._0218_page01_word );
			}
			add_to_global_timeline();
		});
	}
}
