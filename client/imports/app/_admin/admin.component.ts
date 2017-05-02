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
	canvas_title = '<h3 class="post-title"></h3>';
	project_title = '';
	word_title = '<h3 class="post-title"></h3>';
	isCopied1: boolean = false;
	my_words;
	my_canvases;
	public editorContent: string = '<iframe width="100%" height="450" scrolling="no" frameborder="no" src=""></iframe>'
	public editorContent2: string = 'My Project\'s Contents'
	public editorContent3: string = 'My Word\'s Contents'
	public options: Object = { 
		placeholderText: 'Edit Your Content Here!',
		charCounterCount: false,
		paragraphStyles: {
			inner_style: 'Inner'
		},
		paragraphFormat: {
			N: 'Normal',
			H1: 'Heading 1',
			H2: 'Heading 2',
			H3: 'Heading 3',
			H4: 'Heading 4',
			CODE: 'CodeInner',
			PRE: 'CodeOuter'
		}
	}
 
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
					 $('div#froala-editor').froalaEditor({
				      // Define new paragraph styles.
				      paragraphStyles: {
				        class1: 'Class 1',
				        class2: 'Class 2'
				      },
				      toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', '|', 'paragraphStyle', 'paragraphFormat', 'align', 'undo', 'redo', 'html']
				    });
				},100)
			},
			onError: function () { console.log("onError", arguments); }
		});
		$('body').addClass('is_admin_components');
	}
	openFileListDialog() {
		const config = new MdDialogConfig();
		let dialogRef = this.dialog.open(DialogShowFileList, config);
	}
	updateData() {
		this.my_words = this.get_words();
		this.my_canvases = this.get_canvases();
	}
	logout() {
		this._service.logout();
	}
	strip_from_html(html) {
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	}
	addCanvas(canvas_title) {
		var inital_value = [ { id: 1, text: canvas_title} ];
		var content_length = CanvasContents.find().map((messages: Canvas[]) => { return messages; }).length;
		CanvasContents.insert({
			contentid: content_length + 1,
			canvastitle: this.strip_from_html(canvas_title),
			content: inital_value,
			createdAt: new Date,
		});
		this.canvas_title = '<h3 class="post-title"></h3>';
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
		this.editorContent = '<iframe width="100%" height="450" scrolling="no" frameborder="no" src=""></iframe>';
	}
	get_canvases(): Canvas[] {
		return CanvasContents.find().map((messages: Canvas[]) => { return messages; });
	}
	removeCanvas(canvas) {
		CanvasContents.remove(canvas._id);
		this.re_order_contents('canvas');
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
			wordtitle: this.strip_from_html(word_title),
			content: inital_value,
			createdAt: new Date,
		});
		this.word_title = '<h3 class="post-title"></h3>';
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
		this.re_order_contents('word');
		this.my_words = this.get_words();
	}
	re_order_contents(content_type) {
		console.log('re_order_contents : ' + content_type);
		if (content_type == 'canvas') {
			var canvas_content_list = CanvasContents.find({}, { fields: {'content':0} }).map((messages: Canvas[]) => { return messages; });

			canvas_content_list.forEach((item, index) => {
				CanvasContents.update(item._id, {
					$set: {
						contentid: (index + 1)
					},
				});
			});
		} else if (content_type == 'word') {
			var word_content_list = WordContents.find({}, { fields: {'content':0} }).map((messages: Canvas[]) => { return messages; });

			word_content_list.forEach((item, index) => {
				WordContents.update(item._id, {
					$set: {
						contentid: (index + 1)
					},
				});
			});
		}

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
			onReady: function () {},
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
