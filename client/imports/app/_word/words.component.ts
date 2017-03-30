import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WordContents } from '../../../../imports/api/word-contents.js';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import template from './words.component.html';
import template_dialog from './dialog-show-word-list.html';
import { SafeHtmlPipe } from '../safe.html.pipe';
import { Counts } from 'meteor/tmeasday:publish-counts';

@Component({
	selector: 'my-words',
	template: template,
	styles: [ `
	.mywords {
		height: 100%;
		width: 100%;
		background: green;
	}` ],
})
export class WordsComponent implements OnInit {
	newText = '';
	current_word;
	current_word_length = 0;
	current_word_id: number;
	word_list;
	word_list_length = 0;
	isLastScene;
	isTitleScene;

	constructor(
		private router: Router,
		public dialog: MdDialog ) {
		router.events.forEach((event) => {
			if (event.url == "/slider-dashboard" || event.url == "/slider-dashboard#WordPage") {
				this.isTitleScene = true;
			} else
				this.isTitleScene = false; 
			if (event instanceof NavigationStart) {
				if ( (event.url).slice(-1) == this.current_word_length - 1)
					this.isLastScene = true;
				else
					this.isLastScene = false; 
			}
		});
	}
	trackByFn(index, item) {
		return index;
	}
	ngOnInit() {
		var refreshIntervalId = setInterval(() => this.updateData(), 100);
		
		Meteor.subscribe("wordcontents", {
			onReady: function () {
				setTimeout( () => {
					clearInterval(refreshIntervalId);
				},100)
			},
			onError: function () { console.log("onError", arguments); }
		});
	}
	updateData() {
		this.word_list = WordContents.find({}, {fields: {'wordtitle':1}}).map((messages: Canvas[]) => { return messages; });
		this.word_list_length = this.word_list.length;
		this.current_word = this.get_word(1);
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
				this.router.navigateByUrl('slider-dashboard/#WordPage');
			}
		} else if(which_word == 'younger') {
			this.current_word_id += 1;
			if (this.current_word_id - 1 >= this.word_list_length) {
				alert('It is the Last Canvas!');
				this.current_word_id -= 1;
				return false;
			} else {
				this.current_word = this.get_word(this.current_word_id);
				this.router.navigateByUrl('slider-dashboard/#WordPage');
			}
		} else {
			var res = WordContents.find({ _id: which_word }).map((messages: Canvas[]) => { return messages; })[0].content;
			this.current_word_length = res.length;
			return res;
		}
		return true;
	}
	get_recent_word() {
		this.current_word = this.get_word(this.word_list_length);
		this.updatefullpage();
	}
	openWordListDialog() {
		const config = new MdDialogConfig();

		config.data = this.word_list;
		let dialogRef = this.dialog.open(DialogShowWordList, config);
		dialogRef.afterClosed().subscribe(
			result => {
			if (result != undefined) {
				this.current_word = this.get_word(result)
				this.updatefullpage();
			}
		});
	}
	older_from_current_word() {
		if ( this.get_word('older') )
			this.updatefullpage();
	}
	younger_from_current_word() {
		if ( this.get_word('younger') )
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
				sectionsColor: ['yellow', '#4BBFC3', '#7BAABE', '#F5E0E0', '#000'],
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
}

@Component({
	selector: 'dialog-show-word-list',
	template: template_dialog
})
export class DialogShowWordList {
	private word_list;
	constructor(public dialogRef: MdDialogRef<DialogShowWordList>) {}
	ngOnInit() {
		// data
		this.word_list = this.dialogRef.config.data;
	}
}
