import template from './slider-dashboard.component.html';
import fullpagecss from 'fullpage.js/dist/jquery.fullpage.css';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from './router.animations';
import { AuthenticationService } from './_simple_login/authentication.service'
import { ActivatedRoute, Params } from '@angular/router';
import { WordContents } from '../../../imports/api/word-contents.js';
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
	hero;
	current_word;
	current_word_id: number;
	word_list;
	word_list_length = 0;
	master: string = 'Master';
	constructor(
		private _service:AuthenticationService,
		private route: ActivatedRoute, ) {
	}
	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.test_route_func(params['plink']))
			.subscribe(result => this.hero = result);
		// console.log('masterName : ' + this.masterName);
		var refreshIntervalId = setInterval(() => this.updateData(2), 100);
		
		Meteor.subscribe("wordcontents", {
			onReady: function () {
				setTimeout( () => {
					clearInterval(refreshIntervalId);
				},100)
			},
			onError: function () { console.log("onError", arguments); }
		});
		console.log('E - ngOnInit');
		console.log('result : ' + this.hero);

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
				scrollOverflow: true
			});
		});
	}
	test_route_func(plink) {
		console.log('S - test_route_func');
		console.log('plink : ' + plink);
		return 'A';
	}
	get_word(which_word): Canvas[] {
		if (!isNaN(which_word)) {
			this.current_word_id = which_word;
			var res = WordContents.find({ contentid: which_word }).map((messages: Canvas[]) => { return messages; })[0].content;
			this.current_word_length = res.length;
			return res;
		} else if(which_word == 'older') {
			this.current_word_id -= 1;
			if (this.current_word_id - 1 < 1) {
				alert('It is the First Canvas!');
				this.current_word_id += 1;
				return false;
			} else {
				this.current_word = this.get_word(this.current_word_id);
				this.location.go('slider-dashboard/#WordPage');
			}
		} else if(which_word == 'younger') {
			this.current_word_id += 1;
			if (this.current_word_id - 1 >= this.word_list_length) {
				alert('It is the Last Canvas!');
				this.current_word_id -= 1;
				return false;
			} else {
				this.current_word = this.get_word(this.current_word_id);
				this.location.go('slider-dashboard/#WordPage');
			}
		} else {
			var res = WordContents.find({ _id: which_word }).map((messages: Canvas[]) => { return messages; })[0].content;
			this.current_word_length = res.length;
			return res;
		}
		return true;
	}
	updateData(opt) {
		console.log('S - updateData');
		this.word_list = WordContents.find({}, {fields: {'wordtitle':1}}).map((messages: Canvas[]) => { return messages; });
		this.word_list_length = this.word_list.length;
		this.current_word = this.get_word(opt);
		console.log('this.current_word : ');
		console.log(this.current_word);
		console.log('E - updateData');
		if (opt == 2)
			this.updatefullpage();
	}
	updatefullpage() {
		var reloadfullpage = function() {
			$('#fullpage').fullpage({
				menu: '#menu',
				lockAnchors: false,
				anchors:['CanvasPage', 'ProjectPage', 'WordPage'],
				navigation: true,
				navigationPosition: 'right',
				navigationTooltips: ['Canvas', 'Project', 'Word'],
				showActiveTooltip: true,
				slidesNavigation: true,
				slidesNavPosition: 'top',
				sectionsColor: ['#FCBCB0', '#CEA1AC', '#EDA89C', '#F5E0E0', '#000'],
				controlArrows: false,
				scrollOverflow: true
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
