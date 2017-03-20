import template from './app.component.html';
import style from './app.component.css';
import fontawesome from 'fontawesome/css/font-awesome.css';
import froala_editor_css from 'froala-editor/css/froala_editor.pkgd.min.css';
import material_indigo_theme from '@angular/material/core/theming/prebuilt/indigo-pink';
import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: template,
	style, material_indigo_theme, froala_editor_css,
})
export class MyCanvas { }
