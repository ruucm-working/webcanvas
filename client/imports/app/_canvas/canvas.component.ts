import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { CanvasContents } from '../../../../imports/api/canvas-contents.js';
import { Canvas0218Service } from '../_mojs_services/canvas0218.service';
import { Canvas0303Service } from '../_mojs_services/canvas0303.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import template from './canvas.component.html';
import template_dialog from './dialog-show-canvas-list.html';
import myGlobals = require('../globals');

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
	providers: [ Canvas0218Service, Canvas0303Service ]
})
export class CanvasComponent {
	newText = '';
	@Input('current_canvas') current_canvas;
	@Input('current_canvas_length') current_canvas_length;
	@Input('current_canvas_id') current_canvas_id;
	@Input('current_canvas_url') current_canvas_url;
	@Input('canvas_list') canvas_list;
	@Input('canvas_list_length') canvas_list_length;
	isLastScene;
	isTitleScene;
	share_button_text = 'Share It!';
	isCopied: boolean = false;
	isCopied1: boolean = false;

	constructor(
		private _service2:Canvas0218Service,
		private _service3:Canvas0303Service,
		private router: Router,
		public dialog: MdDialog,
		private location: Location ) {
		router.events.forEach((event) => {
			if (event.url == "/slider-dashboard" || (event.url).slice(-11) == "#CanvasPage") {
				this.stop_other_anims();
				this.isTitleScene = true;
			} else
				this.isTitleScene = false; 
			if (event instanceof NavigationStart) {
				if ( (event.url).slice(-1) == this.current_canvas_length - 1)
					this.isLastScene = true;
				else
					this.isLastScene = false; 
				this.stop_other_anims();
				if (event.url == "/slider-dashboard#CanvasPage/1") {
					myGlobals.scene01_timeline.play();
				}
				if (event.url == "/slider-dashboard#CanvasPage/2") {
					myGlobals.scene02_timeline.play();
				}
				if (event.url == "/slider-dashboard#CanvasPage/3") {
					myGlobals.scene03_timeline.play();
				}
				if (event.url == "/slider-dashboard#CanvasPage/4") {
					myGlobals.scene04_timeline.play();
				}
			}
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
	ngOnInit() {
		myGlobals.scene01_timeline = new mojs.Timeline();
		myGlobals.scene02_timeline = new mojs.Timeline();
		myGlobals.scene03_timeline = new mojs.Timeline();
		myGlobals.scene04_timeline = new mojs.Timeline();
	}
	stop_other_anims() {
		console.log('stop anim!');
		myGlobals.scene01_timeline.stop();
		myGlobals.scene02_timeline.stop();
		myGlobals.scene03_timeline.stop();
		myGlobals.scene04_timeline.stop();
	}
	get_canvase(which_canvas): Canvas[] {
		console.log('which_canvas == ' + which_canvas);
		if (which_canvas == 1){
			console.log('which_canvas == 1');
		} else if (which_canvas == 2)
			this._service2.anim_init();
		else if (which_canvas == 3)
			this._service3.anim_init();
		if (!isNaN(which_canvas)) {
			this.current_canvas_id = which_canvas;
			var res = CanvasContents.find({ contentid: which_canvas }).map((messages: Canvas[]) => { return messages; })[0].content;
			this.current_canvas_length = res.length;
			this.current_canvas_length = res.length;
			return res;
		} else if(which_canvas == 'older') {
			this.current_canvas_id -= 1;
			if (this.current_canvas_id - 1 < 1) {
				alert('It is the First Canvas!');
				this.current_canvas_id += 1;
				return false;
			} else {
				this.stop_other_anims();
				this.current_canvas = this.get_canvase(this.current_canvas_id);
				this.location.go('slider-dashboard#CanvasPage');
				this.isTitleScene = true; 
				this.isLastScene = false; 
				myGlobals.scene01_timeline.play();
			}
		} else if(which_canvas == 'younger') {
			this.current_canvas_id += 1;
			if (this.current_canvas_id - 1 >= this.canvas_list_length) {
				alert('It is the Last Canvas!');
				this.current_canvas_id -= 1;
				return false;
			} else {
				this.stop_other_anims();
				this.current_canvas = this.get_canvase(this.current_canvas_id);
				this.location.go('slider-dashboard#CanvasPage');
				this.isTitleScene = true; 
				this.isLastScene = false; 
				myGlobals.scene01_timeline.play();
			}
		} else {
			var res = CanvasContents.find({ _id: which_canvas }).map((messages: Canvas[]) => { return messages; })[0].content;
			this.current_canvas_length = res.length;
			return res;
		}
		return true;
	}
	update_permalink(id) {
		var getUrl = window.location;
		var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
		this.current_canvas_url = baseUrl + 'canvas/'+ id;
		this.isCopied = false;
		this.share_button_text = "Share It!";
	}
	get_recent_canvas() {
		this.current_canvas = this.get_canvase(this.canvas_list_length);
		this.updatefullpage();
	}
	openCanvasListDialog() {
		const config = new MdDialogConfig();
		config.data = this.canvas_list;
		let dialogRef = this.dialog.open(DialogShowCanvasList, config);
		dialogRef.afterClosed().subscribe(
			result => {
			if (result != undefined) {
				this.current_canvas = this.get_canvase(result)
				this.updatefullpage();
			}
		});
	}
	older_from_current_canvase() {
		if ( this.get_canvase('older') ) {
			this.updatefullpage();
		}
	}
	younger_from_current_canvase() {
		if ( this.get_canvase('younger') )
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
				slidesNavigation: false,
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
		this.update_permalink(this.current_canvas_id);
	}
	destroyfullpage() {
		if($('html').hasClass('fp-enabled')){
		    $.fn.fullpage.destroy('all');
		}
		return true;
	}
}

@Component({
	selector: 'dialog-show-canvas-list',
	template: template_dialog
})
export class DialogShowCanvasList {
	private canvas_list;
	constructor(public dialogRef: MdDialogRef<DialogShowCanvasList>) {}
	ngOnInit() {
		this.canvas_list = this.dialogRef.config.data;
	}
}
