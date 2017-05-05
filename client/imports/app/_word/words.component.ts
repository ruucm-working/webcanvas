import { Component, Pipe, PipeTransform, Input } from '@angular/core';
import { SectionService } from '../_slider-dashboard/section.service';
import { Location } from '@angular/common';
import { WordContents } from '../../../../imports/api/word-contents.js';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { SafeHtmlPipe } from '../_slider-dashboard/safe.html.pipe';
import { HighlightJsService } from 'angular2-highlight-js';
import template from './words.component.html';
import template_dialog from './dialog-show-word-list.html';

@Component({
	selector: 'my-words',
	template: template,
})
export class WordsComponent {
	@Input('current_word') current_word;
	@Input('current_word_length') current_word_length;
	@Input('current_word_order') current_word_order;
	@Input('current_word_url') current_word_url;
	@Input('word_list') word_list;
	@Input('word_list_length') word_list_length;
	current_word_id;
	share_button_text = 'Share It!';
	isCopied: boolean = false;
	isCopied1: boolean = false;

	constructor(
		private sectionService: SectionService,
		private highlightJsService: HighlightJsService,
		private router: Router,
		public dialog: MdDialog,
		private location: Location ) {
		router.events.forEach((event) => {
			if ((event.url).slice(-9) == "#WordPage") {
				this.sectionService.isWordTitleScene = true;
			} else
				this.sectionService.isWordTitleScene = false; 
			if (event instanceof NavigationStart) {
				if ( (event.url).slice(-1) == this.current_word_length - 1)
					this.sectionService.isWordLastScene = true;
				else
					this.sectionService.isWordLastScene = false; 
			}
		});
	}
	HighlightUsingService() {
		var x = document.querySelectorAll('.typescript');
		x.forEach((item, index) => {
			this.highlightJsService.highlight(item);
		});
	}
	trackByFn(index, item) {
		return index;
	}
	share_text_change() {
		if (!this.isCopied) {
			this.share_button_text = "Now, Link Copied";
			this.isCopied = true;
		} else {
			this.share_button_text = "Share It!";
			this.isCopied = false;
		}
	}
	get_word(which_word): Canvas[] {
		console.log('get_word, which_word : ' + which_word);
		if (!isNaN(which_word)) {
			this.current_word_order = which_word;
			var res = WordContents.find({ contentid: which_word }).map((messages: Canvas[]) => { return messages; })[0];
			this.current_word_id = res._id;
			this.current_word_length = res.content.length;
			return res.content;
		} else if(which_word == 'older') {
			this.current_word_order -= 1;
			if (this.current_word_order - 1 < 1) {
				this.sectionService.openSnackBar('It is the Oldest fish, I\'ve ever Caught!', '👌');
				this.current_word_order += 1;
				return false;
			} else {
				this.current_word = this.get_word(this.current_word_order);
				this.sectionService.isWordTitleScene = true; 
				this.sectionService.isWordLastScene = false; 
			}
		} else if(which_word == 'younger') {
			this.current_word_order += 1;
			if (this.current_word_order - 1 >= this.word_list_length) {
				this.sectionService.openSnackBar('It is the Youngest fish, I\'ve ever Caught!', '👌');
				this.current_word_order -= 1;
				return false;
			} else {
				this.current_word = this.get_word(this.current_word_order);
				this.sectionService.isWordTitleScene = true; 
				this.sectionService.isWordLastScene = false; 
			}
		} else {
			var res = WordContents.find({ _id: which_word }).map((messages: Canvas[]) => { return messages; })[0].content;
			this.current_word_length = res.length;
			return res;
		}
		return true;
	}
	update_permalink(id) {
		var getUrl = window.location;
		var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
		this.current_word_url = baseUrl + 'word/'+ id;
		this.isCopied = false;
		this.share_button_text = "Share It!";
	}
	get_recent_word() {
		this.show_loading_cover();
		this.current_word = this.get_word(this.word_list_length);
		this.updatefullpage();
		this.hide_loading_cover();
	}
	openWordListDialog() {
		const config = new MdDialogConfig();

		config.data = this.word_list;
		let dialogRef = this.dialog.open(DialogShowWordList, config);
		dialogRef.afterClosed().subscribe(
			result => {
			console.log('curr - result : ' + result);
			if (result != undefined) {
				this.show_loading_cover();
				this.current_word = this.get_word(result);
				this.updatefullpage();
				this.hide_loading_cover();
			}
		});
	}
	older_from_current_word() {
		if ( this.get_word('older') ) {
			this.show_loading_cover();
			this.sectionService.fixurl_to_title_page();
			this.updatefullpage();
			this.hide_loading_cover();
		}
	}
	younger_from_current_word() {
		if ( this.get_word('younger') ) {
			this.show_loading_cover();
			this.sectionService.fixurl_to_title_page();
			this.updatefullpage();
			this.hide_loading_cover();
		}
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
				showActiveTooltip: false,
				slidesNavigation: false,
				sectionsColor: ['#FCBCB0', '#CEA1AC', '#EDA89C', '#F5E0E0', '#000'],
				controlArrows: false,
				scrollOverflow: true,
				scrollingSpeed: 550
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
		this.update_permalink(this.current_word_id);
	}
	destroyfullpage() {
		if($('html').hasClass('fp-enabled')){
			$.fn.fullpage.destroy('all');
		}
		return true;
	}

	/* Inner Cover Load-Effect */
	show_loading_cover() {
		$("#slider-dashboard-container").removeClass("loading_inner_data_end");
		$("#slider-dashboard-container").addClass("loading_inner_data");
		$(".loading-screen-2").removeClass("loading_end");
		$(".loading-screen-2").removeClass("loading-screen-2-hide");
	}
	hide_loading_cover() {
		setTimeout(() => { 
			$("#slider-dashboard-container").removeClass("loading_inner_data");
			$("#slider-dashboard-container").addClass("loading_inner_data_end");
			this.myproject_lazy_load();
		}, 100);
		$(".loading-screen-2").addClass("loading_end");
		setTimeout(() => { $(".loading-screen-2").addClass("loading-screen-2-hide"); this.HighlightUsingService(); this.sectionService.addMoveToclickEvent(); }, this.sectionService.loading_screen_2_duration );
	}
	myproject_lazy_load() {
		$(".myprojects").removeClass("loading_inner_data");
		$(".myprojects").addClass("loading_inner_data_end");
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
