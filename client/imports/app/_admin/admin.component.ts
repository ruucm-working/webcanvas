import { Component } from '@angular/core';
import { AuthenticationService } from '../_simple_login/authentication.service'
import { CanvasContents } from '../../../../imports/api/canvas-contents.js';
import { ProjectContents } from '../../../../imports/api/project-contents.js';
import { WordContents } from '../../../../imports/api/word-contents.js';
import { MyFiles } from '../../../../imports/api/my-files.js';
import { Slide } from '../slide.ts';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import template from './admin.component.html'
import template_dialog_filelist from './dialog-show-file-list.html';

@Component({
	selector: 'my-admin',
	providers: [AuthenticationService],
	template: template
})
export class AdminComponent {
	canvas_title = '';
	project_title = '';
	word_title = '';
	isCopied1: boolean = false;
	my_words;
	my_canvases;
	public editorContent: string = 'My Canvas\'s Contents'
	public editorContent2: string = 'My Project\'s Contents'
	public editorContent3: string = 'My Word\'s Contents'

	constructor(
		private _service:AuthenticationService,
		public dialog: MdDialog
	){}
	ngOnInit(){
		this._service.checkCredentials();
		var refreshIntervalId = setInterval(() => this.updateData(), 100);
		Meteor.subscribe("wordcontents", {
			onReady: function () {
				setTimeout( () => {
					clearInterval(refreshIntervalId);
				},100)
			},
			onError: function () { console.log("onError", arguments); }
		});
		Meteor.subscribe("canvascontents", {
			onReady: function () {
				setTimeout( () => {
					clearInterval(refreshIntervalId);
				},100)
			},
			onError: function () { console.log("onError", arguments); }
		});
	}
	openFileListDialog() {
		const config = new MdDialogConfig();

		// config.data = this.word_list;
		let dialogRef = this.dialog.open(DialogShowFileList, config);
		// dialogRef.afterClosed().subscribe(
		// 	result => {
		// 	console.log('curr - result : ' + result);
		// 	if (result != undefined) {
		// 		this.current_word = this.get_word(result);
		// 		// console.log('curr - result : ' + result);
		// 		this.updatefullpage();
		// 	}
		// });
	}
	updateData() {
		this.my_words = this.get_words();
		this.my_canvases = this.get_canvases();
		// this.dataEntries = MyFiles.find({}, {sort: {uploadDate: -1}}).fetch();
	}
	logout() {
		this._service.logout();
	}
	addCanvas(canvas_title) {
		var inital_value = [ { id: 1, text: canvas_title} ];
		var content_length = CanvasContents.find().map((messages: Canvas[]) => { return messages; }).length;
		CanvasContents.insert({
			contentid: content_length + 1,
			canvastitle: canvas_title,
			content: inital_value,
			createdAt: new Date,
		});
		this.canvas_title = '';
		this.my_canvases = this.get_canvases();
	}
	addCanvasContents(canvas, editorContent) {
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
	removeCanvas(canvas) {
		CanvasContents.remove(canvas._id);
		this.my_canvases = this.get_canvases();
	}
	addProject(project_title) {
		var inital_value = [ { id: 1, text: project_title} ];
		var content_length = ProjectContents.find().map((messages: Canvas[]) => { return messages; }).length;
		ProjectContents.insert({
			contentid: content_length + 1,
			projecttitle: project_title,
			content: inital_value,
			createdAt: new Date,
		});
		this.project_title = '';
	}
	addWord(word_title) {
		var inital_value = [ { id: 1, text: word_title} ];
		var content_length = WordContents.find().map((messages: Canvas[]) => { return messages; }).length;
		WordContents.insert({
			contentid: content_length + 1,
			wordtitle: word_title,
			content: inital_value,
			createdAt: new Date,
		});
		this.word_title = '';
		this.my_words = this.get_words();
	}
	addWordContents(word, editorContent3) {
		console.log('canvas._id : ');
		console.log(word._id);
		var value = word.content;
		value.push({ id: value.length + 1, text: editorContent3, createdAt: new Date, });
		WordContents.update(word._id, {
			$set: {
				content: value
			},
		});
		this.editorContent3 = '';
	}
	get_words(): Canvas[] {
		return WordContents.find().map((messages: Canvas[]) => { return messages; });
	}
	removeWord(word) {
		WordContents.remove(word._id);
		this.my_words = this.get_words();
	}
}

@Component({
	selector: 'dialog-show-file-list',
	template: template_dialog_filelist
})
export class DialogShowFileList {
	private file_list;
	dataEntries;
	baseurl;

	constructor(public dialogRef: MdDialogRef<DialogShowFileList>) {}
	ngOnInit() {
		// data
		this.file_list = this.dialogRef.config.data;
		var getUrl = window.location;
		var baselocationUrl = getUrl .protocol + "//" + getUrl.host + getUrl.pathname.split('/')[0];
		this.baseurl = baselocationUrl + MyFiles.baseURL;
		Meteor.subscribe("myData", {
			onReady: function () {
				console.log('onReady');
				// setTimeout( () => {
				// 	clearInterval(refreshIntervalId);
				// },100)
			},
			onError: function () { console.log("onError", arguments); }
		});
		// This assigns a file upload drop zone to some DOM node
		// MyFiles.resumable.assignDrop($(".fileDrop"));
		MyFiles.resumable.assignBrowse($(".fileBrowse"));
		// When a file is added via drag and drop
		MyFiles.resumable.on('fileAdded', function (file) {
		// Create a new file in the file collection to upload
			MyFiles.insert({
				_id: file.uniqueIdentifier,  // This is the ID resumable will use
				filename: file.fileName,
				contentType: file.file.type
			},	function (err, _id) {  // Callback to .insert
					if (err) { return console.error("File creation failed!", err); }
					// Once the file exists on the server, start uploading
					MyFiles.resumable.upload();
				}
			);
		});
	}
	get_dataEntries() {
		return MyFiles.find({}, {sort: {uploadDate: -1}}).fetch();
	}
}
