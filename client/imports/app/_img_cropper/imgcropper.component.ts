import { Component } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import template from './imgcropper.html';

@Component({
	selector: 'test-app',
	template: template,
})
export class ImageCropperAppComponent {
	data: any;
	cropperSettings: CropperSettings;

	constructor() {
		this.cropperSettings = new CropperSettings();
		this.cropperSettings.croppedWidth =1080;
		this.cropperSettings.croppedHeight = 1080;
		this.cropperSettings.rounded = true;
		this.cropperSettings.keepAspect = true;
		this.data = {};
		$(".loading-screen-1").addClass("loading_end");
	}
}
