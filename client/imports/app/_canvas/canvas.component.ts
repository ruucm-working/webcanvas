import { Component, OnInit } from '@angular/core';
import { CanvasContents } from '../../../../imports/api/canvas-contents.js';
import { Canvas } from './canvas.ts';
import template from './canvas.component.html';
import feb01_css from '../css/0218.css';

export class TotalCanvas {
	contentid: number;
	content: Canvas[];
}
const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

const TEST_CANVASES: TotalCanvas[] = [
	{ contentid: 11, content: [ { id: 31, text: 'slide-text01'}, { id: 32, text: 'slide-text02'} ] },
	{ contentid: 12, content: [ { id: 41, text: 'slide-text11'}, { id: 42, text: 'slide-text12'} ] },
	{ contentid: 13, content: [ { id: 51, text: 'slide-text21'}, { id: 52, text: 'slide-text22'} ] },
];
@Component({
	selector: 'my-canvases',
	template: template,
	styles: [ `
	.mycanvases {
		height: 100%;
		position: absolute;
		width: 100%;
		background: pink;
	}` ],
	feb01_css,
})
export class CanvasComponent implements OnInit, OnDestory, OnChanges {
	newText = '';
	firstornot = true;
	// total_canvases = this.get_canvases('current');
	total_canvases = TEST_CANVASES;
	current_canvas = Canvas;

	heroes = HEROES;
	constructor() {
		if (this.current_canvas.length == 0)
			this.current_canvas = this.total_canvases[0].content;
	}
	get_canvases(w): Canvas[] {
		if (w == 'current') {
			return 'v';
		} else if(w == 'prev') {

		} else if(w == 'next') {

		}
		return '';
	}
	prev_from_current_canvase() {

	}
	next_from_current_canvase() {
		console.log('next_from_total_canvasese : ');
		this.current_canvas = this.total_canvases[1].content;
		this.updatefullpage();
	}
	updatefullpage() {
		var reloadfullpage = function() {
			$('#fullpage').fullpage({
				menu: '#menu',
		        lockAnchors: false,
		        anchors:['firstPage', 'secondPage'],
		        navigation: true,
		        navigationPosition: 'right',
		        navigationTooltips: ['firstSlide', 'secondSlide'],
		        showActiveTooltip: true,
		        slidesNavigation: true,
		        slidesNavPosition: 'top',
		        sectionsColor: ['yellow', '#4BBFC3', '#7BAABE', '#F5E0E0', '#000'],
			});
		}
		//Promise 선언
		var _promise = function (param) {
			return new Promise(function (resolve, reject) {
				// 비동기를 표현하기 위해 setTimeout 함수를 사용 
				window.setTimeout(function () {
					// 파라메터가 참이면, 
					if (param) {
						// 해결됨 
						resolve("해결 완료");
					}
					// 파라메터가 거짓이면, 
					else {
						// 실패 
						reject(Error("실패!!"));
					}
				}, 0);
			});
		};
		//Promise 실행
		_promise(this.destroyfullpage())
		.then(function (text) {
			// 성공시
			reloadfullpage();
			console.log(text);
		}, function (error) {
			// 실패시 
			console.error(error);
		});
	}
	destroyfullpage() {
		if($('html').hasClass('fp-enabled')){
		    $.fn.fullpage.destroy('all');
		}
		return true;
	}
	ngOnChanges() {
		console.log('ngOnChange canvas.component');
	}
	ngOnInit() {
		console.log('ngOnInit canvas.component');

		$( document ).ready(function() {
			// var shape = new mojs.Shape({
		 //       radius:   { 15: 50 },
			//     children: {
			//       fill:   [ 'deeppink', 'cyan', 'orange' ],
			//   }
		 //    });
		 //    var burst = new Burst({
			//     radius:   { 15: 50 },
			//     children: {
			//       fill:   [ 'deeppink', 'cyan', 'orange' ],
			//   }
			// });
			const burst = new mojs.Burst({
				left: 0, top: 0,
				radius: { 0: 300 },
				count: 3,
				degree: 30,
				angle: { 0: 60 },
				opacity: { 1: 0 },
			});
			const burst2 = new mojs.Burst({
				left: 0, top: 0,
				radius: { 0: 300 },
				count: 3,
				degree: 30,
				angle: { 0: 60 },
				opacity: { 1: 0 },
				children: {
					fill: { 'cyan' : 'yellow' },
					radius:       20,
					duration: 5000
				},
			});
			document.addEventListener( 'click', function (e) {
				burst2
				  .tune({ x: e.pageX, y: e.pageY })
				  .setSpeed(3)
				  .replay();
				});
			// const leg_left = new mojs.Html({
			// 	repeat:   999,
			// 	duration: 1000,
			// 	el: '.gem__leg-left',
			// 	y: { 0: -2, curve: 'M0, 100 C0, 100 1.9274601017238027, -100.72671479853175 50, -100 C50.072539898276204, 15.583857655674608 100, 100 100, 100' },
			// 	angleZ: { 0: 21, curve: 'M0, 100 C0, 100 1.9274601017238027, -100.72671479853175 50, -100 C50.072539898276204, 15.583857655674608 100, 100 100, 100' }
			// });

			let CHAR_STEP  = 50;
			const bounceCurve = mojs.easing.path('M0,-100 C0,-100 15.6877613,115.487686 32.0269814,74.203186 C62.0118605,-1.559962 100.057489,-0.0941416292 100.057489,-0.0941416292');
			const nBounceCurve = (p) => { return 2 - bounceCurve(p) };
			Y_SHIFT    = -20;
			X_SHIFT    = CHAR_STEP/2;
			// const word_char3 = new mojs.Html({
			// 	left: '30%', top: '70%',
			// 	fill:         'none',
			// 	radius:       23,
			// 	isShowEnd:    true,
			// 	isForce3d:    true,
			// 	el: '.bottom__text03',
			// 	y: { [Y_SHIFT]: -200 + Y_SHIFT },
			// 	angle: { 0 : -180, easing: 'cubic.in' },
			// 	x: -4*CHAR_STEP + X_SHIFT,
			// 	scaleY: { 1: 1, curve: bounceCurve },
			// 	scaleX: { 1: 1, curve: nBounceCurve },
			// 	easing: 'quad.out',
			// 	delay: 250,
			// 	duration: 350,
			// })
			// .then({
			//   y: Y_SHIFT,
			//   angle: { to: -360, easing: 'expo.out' },
			//   easing: 'bounce.out',
			//   duration: 1000,
			//   origin: '50% 100%',
			// })
			// const character3 = document.createElement('div');
			// 	character3.classList.add( 'character' );
			// 	word_char3.el.appendChild( character3 );
			// character3.innerHTML = '카페에 와있다';
			class Underline extends mojs.CustomShape {
			  getShape () { return '<path d="M2.5,50.3296666 C3.31230785,50.3563224 4.33314197,51.7391553 5.26159075,51.244112 C6.0077473,50.8462659 7.06209448,50.3203773 7.71562592,50.3296666 C8.76504493,50.344583 10.5026522,50.7289147 10.5026522,50.7289147 C10.5026522,50.7289147 12.2264054,51.3540485 14.3045941,51.244112 C15.3644039,51.1880478 16.0579859,49.0942327 17.5373074,49.0205791 C18.3943409,48.9779084 19.7113596,50.7755195 20.6875422,50.7289147 C21.6556682,50.6826945 22.3001602,49.0692534 23.3699153,49.0205791 C24.1641633,48.9844405 26.4617126,51.2809265 27.3045404,51.244112 C28.6211722,51.1866018 29.868997,49.0779353 31.2843519,49.0205791 C32.5621635,48.9687968 34.5177647,50.7788661 35.8572938,50.7289147 C36.7433562,50.6958732 38.2335712,49.0522313 39.1401705,49.0205791 C39.9800278,48.9912571 40.561996,49.9055655 41.4152209,49.877823 C42.1696178,49.8532938 42.2680621,50.7519349 43.0298941,50.7289147 C43.9790327,50.7002347 44.036439,49.4065744 44.9921859,49.3806853 C45.4945214,49.3670781 46.5973018,48.5718404 47.1003097,48.559109 C48.1308079,48.5330267 48.971762,50.3516106 49.9999991,50.3296666 C50.8452183,50.3116285 50.5604619,49.1586632 51.3999478,49.1438038 C51.9113862,49.134751 53.4831103,48.5668789 53.9912876,48.559109 C54.882369,48.5454847 55.8282738,48.5684585 56.7056958,48.559109 C57.5279585,48.5503473 57.7153436,49.0252286 58.5216754,49.0205791 C59.2920272,49.016137 59.891015,48.0863678 60.6434283,48.0859881 C61.5658387,48.0855227 62.142412,49.0587083 63.0323087,49.0648534 C63.7314385,49.0696813 66.0372641,48.0767735 66.712955,48.0859881 C68.0228785,48.1038519 67.6682957,49.130074 68.8737479,49.1659145 C69.5874211,49.1871333 71.5986501,48.5310407 72.2696752,48.559109 C73.0379259,48.5912442 75.275178,49.892825 76.2284459,49.877823 C77.75882,49.8537388 76.8128295,49.1641707 78.6451998,49.0836451 C79.7893236,49.0333653 80.4770207,49.924725 81.6706526,49.877823 C83.0151778,49.8249918 82.7003946,49.0428007 84.0369748,49.0205791 C84.9618645,49.0052021 86.6077598,49.8672453 87.4984761,49.877823 C88.1326772,49.8853544 90.8057301,49.8531233 91.4118266,49.877823 C92.2804437,49.9132209 93.4120929,49.7988292 94.2005825,49.877823 C95.0771269,49.9656384 95.2679881,49.7233196 96.0110715,49.877823 C96.6642711,50.0136376 96.9762504,49.6806854 97.5,49.877823"></path>'; }
			  getLength () { return 100; }
			}
			mojs.addShape( 'underline', Underline );
			const COLORS = {
				RED:      '#FD5061',
				YELLOW:   '#FFCEA5',
				BLACK:    '#29363B',
				WHITE:    'white',
				VINOUS:   '#A50710'
			}
			const undeline = new mojs.Shape({
				shape: 'underline',
				fill: 'none',
				radius:   75,
				y: 20,
				duration: 600,
				scaleX: { 2: 1 },
				origin: '0 50%',
				easing: 'cubic.out',
				delay:  675,
				stroke: COLORS.VINOUS,
				strokeWidth: 4,
				strokeLinecap: 'round',
				strokeDasharray:  '100',
				strokeDashoffset: { '100': 0 }
			});
			const wordTimeline = new mojs.Timeline({ delay: 1600 });
			wordTimeline
				.add(
				    // word_char3,
				    // undeline
			);

			const timeline = new mojs.Timeline();
			timeline.add( wordTimeline, 
				// leg_left
				);
			// new MojsPlayer({ add: timeline });
			timeline.play();
		});
	}
	ngOnDestory() {
		console.log('ngOnDestory at canvas.component');
	}
}
