import { Component } from '@angular/core';
import { AuthenticationService } from '../_simple_login/authentication.service'
import { CanvasContents } from '../../../../imports/api/canvas-contents.js';
import { Canvas } from '../canvas.ts';

@Component({
	selector: 'my-admin',
  providers: [AuthenticationService],
	template: `
		<div>Hello Admin</div>
		<div [froalaEditor] [(froalaModel)]="editorContent"></div>
		<div>{{editorContent}}</div>
		<button (click)="addCanvasContents(editorContent)">Add!</button>
		<div [froalaView]="editorContent"></div>
		<br>
		<a routerLink="/home">go back to home</a>
		<a routerLink="/slider-dashboard">Slider Dashboard</a>
		<button (click)="logout()">Click Here to logout</button>
		<form (ngSubmit)="addCanvas(newText)">
			<input [(ngModel)]="newText" type="text" name="text" placeholder="Make new Canvas"/>
		</form>
		<div *ngFor="let canvas of get_canvases(); let i=index">canvas {{i+1}} {{canvas.text}}</div>
	`,
})
export class AdminComponent {
	newText = '';
	my_canvases = this.get_canvases();
	public editorContent: string = 'My Document\'s Title'

	constructor(
		private _service:AuthenticationService){}
	ngOnInit(){
		this._service.checkCredentials();
	}
	logout() {
		this._service.logout();
	}
	addCanvas(newText): void {
		CanvasContents.insert({
			text: newText,
			createdAt: new Date
		});
		this.newText = '';
	}
	addCanvasContents(editorContent): void {
		CanvasContents.insert({
			text: editorContent,
			createdAt: new Date
		});
		this.editorContent = '';
	}
	get_canvases(): Canvas[] {
		return CanvasContents.find().map((messages: Canvas[]) => { return messages; });
	}
}
