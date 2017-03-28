import { Component } from '@angular/core';
import { AuthenticationService } from '../_simple_login/authentication.service'
import { CanvasContents } from '../../../../imports/api/canvas-contents.js';
import { Slide } from '../slide.ts';

@Component({
	selector: 'my-admin',
  providers: [AuthenticationService],
	template: `
		<div>Hello, Admin</div>
		<h2>Canvas Editor</h2>
		<form (ngSubmit)="addCanvas(canvas_title)">
			<input [(ngModel)]="canvas_title" type="text" name="text" placeholder="Make a new Canvas"/>
		</form>
		<div [froalaEditor] [(froalaModel)]="editorContent"></div>
		<h3>Html :</h3><div>{{editorContent}}</div>
		<h3>Output :</h3><div [froalaView]="editorContent"></div>
		<br>
		<a routerLink="/home">go back to home</a>
		<a routerLink="/slider-dashboard">Slider Dashboard</a>
		<button (click)="logout()">Click Here to logout</button>
		<div *ngFor="let canvas of my_canvases; let i=index">
			canvas {{i+1}} : 
			<button (click)="addCanvasContents(canvas, editorContent)">Edit</button>
		</div>
	`,
})
export class AdminComponent {
	canvas_title = '';
	my_canvases = this.get_canvases();
	public editorContent: string = 'My Document\'s Contents'

	constructor(
		private _service:AuthenticationService){}
	ngOnInit(){
		this._service.checkCredentials();
	}
	logout() {
		this._service.logout();
	}
	addCanvas(canvas_title) {
		var inital_value = [ { id: 1, text: canvas_title} ];
		var content_length = CanvasContents.find().map((messages: Canvas[]) => { return messages; }).length;
		CanvasContents.insert({
			contentid: content_length + 1,
			content: inital_value,
			createdAt: new Date,
		});
		this.canvas_title = '';
		this.my_canvases = this.get_canvases();
	}
	addCanvasContents(canvas, editorContent) {
		console.log('canvas._id : ');
		console.log(canvas._id);
		var value = canvas.content;
		value.push({ id: value.length + 1, text: editorContent, createdAt: new Date, });
		CanvasContents.update(canvas._id, {
			$set: {
				content: value
			},
		});
		this.editorContent = '';
	}
	get_canvases(): Canvas[] {
		return CanvasContents.find().map((messages: Canvas[]) => { return messages; });
	}
}
