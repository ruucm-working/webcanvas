import { Component, OnInit } from '@angular/core';
import { CanvasContents } from '../../../imports/api/canvas-contents.js';
import { Canvas } from './canvas.ts';
import { Page01Service } from './_mojs_services/page01.service';

const CANVASES: Canvas[] = [
	{ id: 11, text: 'hey' },
	{ id: 13, text: 'yap' },
	{ id: 15, text: 'hoho' }
];
@Component({
	selector: 'my-canvases',
	template: `
	<div *ngFor="let canvas of first_canvases; let i=index" class="slide" [innerHTML]="canvas.text"></div>
	`,
	styles: [ `
	.mycanvases {
		height: 100%;
		position: absolute;
		width: 100%;
		background: pink;
	}` ],
	providers: [ Page01Service ]
})
export class CanvasesComponent implements OnInit, OnDestory, OnChanges {
	newText = '';
	firstornot = true;
	first_canvases = this.get_canvases();

	constructor( private _service:Page01Service ) { }
	get_canvases(): Canvas[] {
		return CanvasContents.find().map((messages: Canvas[]) => { return messages; });
	}
	addCanvas(newText): void {
		console.log('in addCanvas func');
		CanvasContents.insert({
			text: newText,
			createdAt: new Date
		});
		this.newText = '';
		this.updatefullpage();
	}
	updatefullpage(): void {
		if($('html').hasClass('fp-enabled')){
		    $.fn.fullpage.destroy('all');
		    console.log('destory02!');
		}
		$('#fullpage').fullpage({
			menu: '#menu',
			anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
			showActiveTooltip: true,
			sectionsColor: ['yellow', '#4BBFC3', '#7BAABE', 'red'],
			afterLoad: function(anchorLink, index){
				var loadedSection = $(this);
				console.log('index : ' + index);
				console.log('loadedSection : ' + loadedSection);
				//using index
				if(index == 2){
					alert("Section 2 ended loading");
				}

				//using anchorLink
				if(anchorLink == 'secondSlide'){
					alert("Section 2 ended loading");
				}
			}
		});
	}
	ngOnChanges() {
		console.log('ngOnChange canvas.component');
	}
	ngOnInit() {
		console.log('ngOnInit canvas.component');
		$( document ).ready(function() {
		
		});
	}
	ngOnDestory() {
		console.log('ngOnDestory at canvas.component');
	}
}
