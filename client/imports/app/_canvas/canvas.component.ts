import { Component, OnInit } from '@angular/core';
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
export class CanvasComponent implements OnInit, OnDestory, OnChanges {
	newText = '';
	current_canvas;
	current_canvas_length = 0;
	current_canvas_id: number;
	canvas_list;
	canvas_list_length = 0;
	isLastScene;
	isTitleScene;

	constructor(
		private _service2:Canvas0218Service,
		private _service3:Canvas0303Service,
		private router: Router,
		public dialog: MdDialog ) {
		router.events.forEach((event) => {
			if (event.url == "/slider-dashboard" || event.url == "/slider-dashboard#CanvasPage") {
				console.log('title scene event');
				this.stop_other_anims();
				myGlobals.title_timeline.play();
				this.isTitleScene = true;
			} else
				this.isTitleScene = false; 
			if (event instanceof NavigationStart) {
				console.log('NavigationStart event');
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
	ngOnInit() {
		var refreshIntervalId = setInterval(() => this.updateData(), 100);
		Meteor.subscribe("canvascontents", {
			onReady: function () {
				setTimeout( () => {
					clearInterval(refreshIntervalId);
					console.log("STOP!!");
				},100)
			},
			onError: function () { console.log("onError", arguments); }
		});
		myGlobals.scene01_timeline = new mojs.Timeline();
		myGlobals.scene02_timeline = new mojs.Timeline();
		myGlobals.scene03_timeline = new mojs.Timeline();
		myGlobals.scene04_timeline = new mojs.Timeline();
	}
	updateData() {
		this.canvas_list = CanvasContents.find().map((messages: Canvas[]) => { return messages; });
		this.canvas_list_length = this.canvas_list.length;
		this.current_canvas = this.get_canvase(1);
	}
	stop_other_anims() {
		console.log('stop anim!');
		myGlobals.scene01_timeline.stop();
		myGlobals.scene02_timeline.stop();
		myGlobals.scene03_timeline.stop();
		myGlobals.scene04_timeline.stop();
	}
	get_canvase(which_canvas): Canvas[] {
		console.log('which_canvas : ' + which_canvas);
		if (which_canvas == 1){
			console.log('which_canvas == 1');
		} else if (which_canvas == 2)
			this._service2.anim_init();
		else if (which_canvas == 3)
			this._service3.anim_init();
		if (!isNaN(which_canvas)) {
			console.log('!isNaN(which_canvas)');
			this.current_canvas_id = which_canvas;
			console.log('this.current_canvas_id : ' + this.current_canvas_id);
			console.log('CanvasContents : ');
			console.log(CanvasContents);
			this.current_canvas_length = CanvasContents.find().map((messages: Canvas[]) => { return messages; })[this.current_canvas_id - 1].content.length;
			console.log('this.current_canvas_length : ');
			console.log(this.current_canvas_length);
			return CanvasContents.find().map((messages: Canvas[]) => { return messages; })[this.current_canvas_id - 1].content;
		} else if(which_canvas == 'older') {
			this.current_canvas_id -= 1;
			if (this.current_canvas_id - 1 < 1) {
				alert('It is the First Canvas!');
				this.current_canvas_id += 1;
			} else {
				this.stop_other_anims();
				this.current_canvas = this.get_canvase(this.current_canvas_id);
				this.router.navigateByUrl('slider-dashboard');
				myGlobals.scene01_timeline.play();
			}
		} else if(which_canvas == 'younger') {
			this.current_canvas_id += 1;
			if (this.current_canvas_id - 1 >= this.canvas_list_length) {
				alert('It is the Last Canvas!');
				this.current_canvas_id -= 1;
			} else {
				this.stop_other_anims();
				this.current_canvas = this.get_canvase(this.current_canvas_id);
				this.router.navigateByUrl('slider-dashboard');
				myGlobals.scene01_timeline.play();
			}
		}
		return '';
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
			console.log('result : ');
			console.log(result);
			if (result != undefined) {
				console.log('update!@')
				this.current_canvas = this.get_canvase(result)
				this.updatefullpage();
			}
		});
	}
	older_from_current_canvase() {
		this.get_canvase('older');
		this.updatefullpage();
	}
	younger_from_current_canvase() {
		this.get_canvase('younger');
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
	selector: 'dialog-show-canvas-list',
	template: template_dialog
})
export class DialogShowCanvasList {
	private canvas_list;
	constructor(public dialogRef: MdDialogRef<DialogShowCanvasList>) {}
	ngOnInit() {
		// data
		this.canvas_list = this.dialogRef.config.data;
		console.log('this.canvas_list : ' + this.canvas_list);
		console.log(this.canvas_list);
	}
}
