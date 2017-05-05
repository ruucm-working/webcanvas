import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SectionService {
	loading_screen_1_duration = 2100;
	loading_screen_2_duration = 500;
	isWordLastScene;
	isWordTitleScene;
	isCanvasLastScene;
	isCanvasTitleScene;

	constructor(public snackBar: MdSnackBar) {}
	addMoveToclickEvent(): void {
		var classname = document.getElementsByClassName("post-title");
		for (var i = 0; i < classname.length; i++) {
			classname[i].addEventListener('click', function(){ $.fn.fullpage.moveSlideRight(); }, false);
		}
	}
	fixurl_to_title_page() {
		$.fn.fullpage.moveSlideRight();
	}
	openSnackBar(message: string, action: string) {
	this.snackBar.open(message, action, {
			duration: 2000,
		});
	}
}
