import { Injectable, Component } from '@angular/core';
import myGlobals = require('../globals');
import feb01_css from '../css/0218.css';

@Component({
	feb01_css
})
@Injectable()
export class Canvas0218Service {
	constructor(
	) { }
	ngOnInit() {
		console.log('ngOnInit at page01 service');
	}
	anim_init() {
		console.log('anim_init');
		myGlobals.scene01_timeline = new mojs.Timeline();
		myGlobals.scene02_timeline = new mojs.Timeline();
		myGlobals.scene03_timeline = new mojs.Timeline();
		myGlobals.scene04_timeline = new mojs.Timeline();
		// const curveE01 = new MojsCurveEditor({ name: 'curveE01' });
		// const curveE02 = new MojsCurveEditor({ name: 'curveE02' });

		const COLORS = {
			RED:		'#FD5061',
			YELLOW:	'#FFCEA5',
			BLACK:	'#29363B',
			WHITE:	'white',
			VINOUS:	'#A50710',
			CYAN:		'cyan',
		}
		const burst3 = new mojs.Burst({
			left: 'rand(100, 300)', top: 'rand(100, 500)',
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
			left: 'rand(100, 300)', top: 'rand(100, 500)',
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
			left: 'rand(100, 300)', top: 'rand(100, 500)',
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
			/**
			 *	Scene 01
			 */
			myGlobals._0218_page01_left_leg = new mojs.Html({
				repeat:   999,
				duration: 1000,
				el: '.gem__leg-left',
				y: { 0: -2, curve: 'M0, 100 C0, 100 1.9274601017238027, -100.72671479853175 50, -100 C50.072539898276204, 15.583857655674608 100, 100 100, 100' },
				angleZ: { 0: 21, curve: 'M0, 100 C0, 100 1.9274601017238027, -100.72671479853175 50, -100 C50.072539898276204, 15.583857655674608 100, 100 100, 100' }
			});

			/**
			 *	Scene 03
			 */
			myGlobals._0218_page03_gem_whole = new mojs.Html({
				duration: 1500,
				el: '.gem_scene_03',
				x: { 0: -92, curve: 'M0, 100 C0, 100 1.184188840192192, 83.53009687409352 15, 50 C28.81581115980781, 16.46990312590648 100, 0 100, 0' },
				y: { 0: 213, curve: 'M0, 100 C0, 100 1.184188840192192, 83.53009687409352 15, 50 C28.81581115980781, 16.46990312590648 100, 0 100, 0' },
			});
			myGlobals._0218_page03_gem_whole_jump = new mojs.Html({
				delay: 2000,
				duration: 2000,
				el: '.gem_scene_03',
				x: { [-92]: -92, curve: 'M0, 0 C0, 0 100, 0 100, 0' },
				y: { 213: 213, curve: 'M0, 0 C0, 0 10.714527151416107, 32.774087782441775 25, 32.857142857142854 C39.28547284858389, 32.94019793184394 34.07652636647665, 2.0608881095288702 50, 0 C65.92347363352336, -2.060888109528872 60.714285714285715, 34.99999999999999 75, 35 C89.28571428571429, 35.00000000000001 100, 0 100, 0' },
			});
			myGlobals._0218_page03_gem_cloud = new mojs.Html({
				delay: 800,
				duration: 2000,
				el: '.cloud_from_dash01',
				opacity: { 1: 0 },
				x: { 100: 100, curve: 'M0, 100 C0, 100 1.184188840192192, 83.53009687409352 15, 50 C28.81581115980781, 16.46990312590648 100, 0 100, 0' },
			});
			myGlobals._0218_page03_gem_cloud02 = new mojs.Html({
				delay: 400,
				duration: 2000,
				el: '.cloud_from_dash02',
				opacity: { 1: 0 },
				x: { 100: 100, curve: 'M0, 100 C0, 100 1.184188840192192, 83.53009687409352 15, 50 C28.81581115980781, 16.46990312590648 100, 0 100, 0' },
			});
			myGlobals._0218_page03_gem_cloud03 = new mojs.Html({
				duration: 2000,
				el: '.cloud_from_dash03',
				opacity: { 1: 0 },
				x: { 100: 100, curve: 'M0, 100 C0, 100 1.184188840192192, 83.53009687409352 15, 50 C28.81581115980781, 16.46990312590648 100, 0 100, 0' },
			});

			/**
			 *	Scene 04
			 */
			myGlobals._0218_page04_character01_expression = new mojs.Html({
				duration: 2000,
				repeat: 999,
				el: '.character01_scene_04_expression',
				x: { 100: 100, curve: 'M0, 135 C0, 135 22.75561741162073, 21.672954016950637 50, 35 C77.24438258837927, 48.32704598304935 100, 100 100, 100' },
				scaleY: { 1: 1, curve: 'M0, 135 C0, 135 22.75561741162073, 21.672954016950637 50, 35 C77.24438258837927, 48.32704598304935 100, 100 100, 100' },
				scaleX: { 1: 1, curve: 'M0, 135 C0, 135 22.75561741162073, 21.672954016950637 50, 35 C77.24438258837927, 48.32704598304935 100, 100 100, 100' },
			});
			myGlobals._0218_page04_character02_expression = new mojs.Html({
				duration: 2000,
				repeat: 999,
				el: '.character02_scene_04_expression',
				x: { 100: 100, curve: 'M0, 70 C0, 70 5.079384591746942, 86.2337925480373 13, 90 C20.92061540825306, 93.7662074519627 24.94849636014687, 37.24414731365302 50, 40 C75.05150363985314, 42.75585268634695 100, 75 100, 75' },
			});
			myGlobals._0218_page04_gem_expression = new mojs.Html({
				duration: 1500,
				el: '.gem_scene_04_expression',
				scaleY: { 0: 1 },
				scaleX: { 0: 1 },
				opacity: { 0: 1 }
			});

			/**
			 *	Words
			 */
			let CHAR_STEP  = 50;
			const bounceCurve = mojs.easing.path('M0,-100 C0,-100 15.6877613,115.487686 32.0269814,74.203186 C62.0118605,-1.559962 100.057489,-0.0941416292 100.057489,-0.0941416292');
			const nBounceCurve = (p) => { return 2 - bounceCurve(p) };
			Y_SHIFT    = -20;
			X_SHIFT    = CHAR_STEP/2;
			myGlobals._0218_page01_word = new mojs.Html({
				el: '.bottom__text03',
				opacity: { 0: 1 },
				scaleY: { 1: 1, curve: bounceCurve },
				scaleX: { 1: 1, curve: nBounceCurve },
				easing: 'quad.out',
				delay: 500,
				duration: 650,
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

			myGlobals._0218_page02_word_1 = new mojs.Html({
				left: '30%', top: '70%',
				fill:         'none',
				radius:       23,
				isShowEnd:    true,
				isForce3d:    true,
				el: '.scene_02_bottom__text01',
				y: { [Y_SHIFT]: -200 + Y_SHIFT },
				angle: { 0 : -180, easing: 'cubic.in' },
				x: 55,
				scaleY: { 1: 1, curve: bounceCurve },
				scaleX: { 1: 1, curve: nBounceCurve },
				easing: 'quad.out',
				delay: 250,
				duration: 350,
			})
			.then({
			  y: 50,
			  angle: { to: -360, easing: 'expo.out' },
			  easing: 'bounce.out',
			  duration: 1000,
			  origin: '50% 100%',
			})
			const character_scene_2 = document.createElement('div');
			character_scene_2.classList.add( 'character' );
			myGlobals._0218_page02_word_1.el.appendChild( character_scene_2 );
			character_scene_2.innerHTML = '컴퓨터만 있으면 모든걸 할 수있는 엄청난 놀이터..';

			myGlobals._0218_page03_word_1 = new mojs.Html({
				left: '30%', top: '70%',
				fill:         'none',
				radius:       23,
				isShowEnd:    true,
				isForce3d:    true,
				el: '.scene_03_bottom__text01',
				y: { [Y_SHIFT]: -200 + Y_SHIFT },
				angle: { 0 : -180, easing: 'cubic.in' },
				x: -115,
				scaleY: { 1: 1, curve: bounceCurve },
				scaleX: { 1: 1, curve: nBounceCurve },
				easing: 'quad.out',
				delay: 250,
				duration: 350,
			})
			.then({
			  y: -280,
			  angle: { to: -360, easing: 'expo.out' },
			  easing: 'bounce.out',
			  duration: 1000,
			  origin: '50% 100%',
			})
			const character_scene_3 = document.createElement('div');
			character_scene_3.classList.add( 'character' );
			myGlobals._0218_page03_word_1.el.appendChild( character_scene_3 );
			character_scene_3.innerHTML = '엄청난 포켓몬 명당자리도 있고.. 일도하고 <br>아주 천국';
			myGlobals._0218_page04_word_1 = new mojs.Html({
				el: '.scene_04_bottom__text01',
				delay: 1250,
				duration: 2500,
				opacity: { 0: 1 }
			});
			const character_scene_4 = document.createElement('div');
			character_scene_4.classList.add( 'character' );
			myGlobals._0218_page04_word_1.el.appendChild( character_scene_4 );
			character_scene_4.innerHTML = '근데 약간은 허전하다';
			var add_to_scene01_timeline = function(){
				console.log('add_to_scene01_timeline');
				myGlobals.scene01_timeline.add( myGlobals._0218_page01_left_leg, myGlobals._0218_page01_word );
				myGlobals.scene02_timeline.add( myGlobals._0218_page02_burst, myGlobals._0218_page02_word_1 );
				myGlobals.scene03_timeline.add( myGlobals._0218_page03_gem_whole, myGlobals._0218_page03_gem_whole_jump, myGlobals._0218_page03_gem_cloud, myGlobals._0218_page03_gem_cloud02, myGlobals._0218_page03_gem_cloud03, myGlobals._0218_page03_word_1 );
				myGlobals.scene04_timeline.add( myGlobals._0218_page04_character01_expression, myGlobals._0218_page04_character02_expression, myGlobals._0218_page04_gem_expression, myGlobals._0218_page04_word_1 );
				// myGlobals.mojsplayer = new MojsPlayer({ add: myGlobals.scene04_timeline });
			}
			add_to_scene01_timeline();
			myGlobals.scene01_timeline.play();
		});
	}
}
