import { Injectable } from '@angular/core';
import myGlobals = require('../globals');

@Injectable()
export class Canvas0218Service {
	constructor(
	) { }
	ngOnInit() {
		console.log('ngOnInit at page01 service');
	}
	first_page_anim_init() {
		myGlobals.scene03_timeline = new mojs.Timeline();
			class Underline extends mojs.CustomShape {
			  getShape () { return '<path d="M2.5,50.3296666 C3.31230785,50.3563224 4.33314197,51.7391553 5.26159075,51.244112 C6.0077473,50.8462659 7.06209448,50.3203773 7.71562592,50.3296666 C8.76504493,50.344583 10.5026522,50.7289147 10.5026522,50.7289147 C10.5026522,50.7289147 12.2264054,51.3540485 14.3045941,51.244112 C15.3644039,51.1880478 16.0579859,49.0942327 17.5373074,49.0205791 C18.3943409,48.9779084 19.7113596,50.7755195 20.6875422,50.7289147 C21.6556682,50.6826945 22.3001602,49.0692534 23.3699153,49.0205791 C24.1641633,48.9844405 26.4617126,51.2809265 27.3045404,51.244112 C28.6211722,51.1866018 29.868997,49.0779353 31.2843519,49.0205791 C32.5621635,48.9687968 34.5177647,50.7788661 35.8572938,50.7289147 C36.7433562,50.6958732 38.2335712,49.0522313 39.1401705,49.0205791 C39.9800278,48.9912571 40.561996,49.9055655 41.4152209,49.877823 C42.1696178,49.8532938 42.2680621,50.7519349 43.0298941,50.7289147 C43.9790327,50.7002347 44.036439,49.4065744 44.9921859,49.3806853 C45.4945214,49.3670781 46.5973018,48.5718404 47.1003097,48.559109 C48.1308079,48.5330267 48.971762,50.3516106 49.9999991,50.3296666 C50.8452183,50.3116285 50.5604619,49.1586632 51.3999478,49.1438038 C51.9113862,49.134751 53.4831103,48.5668789 53.9912876,48.559109 C54.882369,48.5454847 55.8282738,48.5684585 56.7056958,48.559109 C57.5279585,48.5503473 57.7153436,49.0252286 58.5216754,49.0205791 C59.2920272,49.016137 59.891015,48.0863678 60.6434283,48.0859881 C61.5658387,48.0855227 62.142412,49.0587083 63.0323087,49.0648534 C63.7314385,49.0696813 66.0372641,48.0767735 66.712955,48.0859881 C68.0228785,48.1038519 67.6682957,49.130074 68.8737479,49.1659145 C69.5874211,49.1871333 71.5986501,48.5310407 72.2696752,48.559109 C73.0379259,48.5912442 75.275178,49.892825 76.2284459,49.877823 C77.75882,49.8537388 76.8128295,49.1641707 78.6451998,49.0836451 C79.7893236,49.0333653 80.4770207,49.924725 81.6706526,49.877823 C83.0151778,49.8249918 82.7003946,49.0428007 84.0369748,49.0205791 C84.9618645,49.0052021 86.6077598,49.8672453 87.4984761,49.877823 C88.1326772,49.8853544 90.8057301,49.8531233 91.4118266,49.877823 C92.2804437,49.9132209 93.4120929,49.7988292 94.2005825,49.877823 C95.0771269,49.9656384 95.2679881,49.7233196 96.0110715,49.877823 C96.6642711,50.0136376 96.9762504,49.6806854 97.5,49.877823"></path>'; }
			  getLength () { return 100; }
			}
			mojs.addShape( 'underline', Underline );
			myGlobals._0218_page03_cloud = new mojs.Shape({
				shape: 'underline',
				fill: 'none',
				radius:   75,
				y: 20,
				duration: 1600,
				scaleX: { 2: 1 },
				opacity: { 1: 0 },
				repeat: 999,
				origin: '0 50%',
				easing: 'cubic.out',
				delay:  675,
				stroke: 'yellow',
				strokeWidth: 4,
				strokeLinecap: 'round',
				strokeDasharray:  '100',
				strokeDashoffset: { '100': 0 }
			});
			myGlobals.scene03_timeline.add( myGlobals._0218_page03_cloud );
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
				// myGlobals.scene03_timeline.add( myGlobals._0218_page03_cloud );
				// myGlobals._0218_page03_cloud.play();
				// myGlobals.scene03_timeline.play();
			}
			add_to_global_timeline();
		});
	}
}
