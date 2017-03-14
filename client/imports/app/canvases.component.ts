import { Component } from '@angular/core';
import { CanvasContents } from '../../../imports/api/canvas-contents.js';

export class Canvas {
	id: number;
	name: string;
}
const CANVASES: Canvas[] = [
	{ id: 11, name: 'hey' },
	{ id: 13, name: 'yap' },
];
@Component({
	selector: 'my-canvases',
	template: `
	<form (ngSubmit)="addCanvas(newText)">
		<input [(ngModel)]="newText" type="text" name="text" placeholder="Type to add text"/>
	</form>
	<li *ngFor="let canvas of get_canvases()">{{canvas.text}}</li>
	<div class="slide" *ngFor="let canvas of canvases">{{canvas.name}}</div>
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
	newText = '';
	canvases = CANVASES;
	get_canvases(): Canvas[] {
		console.log('get_canvases()');
		return CanvasContents.find().map((messages: Canvas[]) => { return messages; });
	}
	mycanvases = this.get_canvases();
	addCanvas(newText): void {
		console.log('in addCanvas func');
		CanvasContents.insert({
			text: newText,
			createdAt: new Date
		});

		this.newText = '';
	}
}
