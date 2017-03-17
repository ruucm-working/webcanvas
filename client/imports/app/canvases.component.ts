import { Component } from '@angular/core';
import { CanvasContents } from '../../../imports/api/canvas-contents.js';

export class Canvas {
	id: number;
	name: string;
}
const CANVASES: Canvas[] = [
	{ id: 11, text: 'hey' },
	{ id: 13, text: 'yap' },
	{ id: 15, text: 'hoho' }
];
@Component({
	selector: 'my-canvases',
	template: `
	<form (ngSubmit)="addCanvas(newText)">
		<input [(ngModel)]="newText" type="text" name="text" placeholder="Type to add text"/>
	</form>
	<div *ngFor="let canvas of first_canvases; let i=index" class="slide">index : {{i+1}} {{canvas.text}}</div>
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
	// canvases = CANVASES;

	first_canvases = this.get_canvases();

	get_canvases(): Canvas[] {
		return CanvasContents.find().map((messages: Canvas[]) => { return messages; });
	}
	get_canvases2(): Canvas[] {
		console.log('get_canvas2 : CANVASES - ');
		console.log(CANVASES);
		// this.updatefullpage();
		return CANVASES;
	}
	addCanvas(newText): void {
		console.log('in addCanvas func');
		// this.canvases = CANVASES;
		CanvasContents.insert({
			text: newText,
			createdAt: new Date
		});

		this.newText = '';
		// CANVASES.push({
		// 	id: 7,
		// 	text: newText,
		// });

		this.updatefullpage();
	}
	updatefullpage(): void {
		if($('html').hasClass('fp-enabled')){
		    $.fn.fullpage.destroy('all');
		    console.log('destory02!');
		}
		$('#fullpage').fullpage({
		 	//Navigation
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
	constructor() {
		// CANVASES.push({
		// 	id: 'New Slide from constructor',
		// 	text: 'push on constructor',
		// });
		// if($('html').hasClass('fp-enabled')){
		//     $.fn.fullpage.destroy('all');
		//     console.log('destory02!');
		// }
		// $('#fullpage').fullpage({
		//  	//Navigation
	 //        menu: '#menu',
	 //        lockAnchors: false,
	 //        anchors:['firstPage', 'secondPage'],
	 //        navigation: true,
	 //        navigationPosition: 'right',
	 //        navigationTooltips: ['firstSlide02', 'secondSlide', 'thirdPage'],
	 //        showActiveTooltip: true,
	 //        slidesNavigation: true,
	 //        slidesNavPosition: 'bottom',

	 //        sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
		// });
	}
	ngOnInit() {
	}
}
