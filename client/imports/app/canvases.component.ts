import { Component } from '@angular/core';
import { CanvasContents } from '../../../imports/api/canvas-contents.js';
import { Canvas } from './canvas.ts';

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
})
export class CanvasesComponent {
	trackByHeroes(index: number, canvas: Canvas): number { return canvas.text; }
	newText = '';
	firstornot = true;
	first_canvases = this.get_canvases();
	test_html = '<p>Hey!</p>';

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
			lockAnchors: false,
			anchors:['firstPage', 'secondPage'],
			navigation: true,
			navigationPosition: 'right',
			navigationTooltips: ['firstSlide02', 'secondSlide', 'thirdPage'],
			showActiveTooltip: true,
			slidesNavigation: true,
			slidesNavPosition: 'bottom',
			sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
		});
	}
}
