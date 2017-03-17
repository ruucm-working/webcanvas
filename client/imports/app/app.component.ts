import template from './app.component.html';
import style from './app.component.css';
import material_indigo_theme from '@angular/material/core/theming/prebuilt/indigo-pink';
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: template,
  style, material_indigo_theme
})
export class MyCanvas {
  title = 'Tour of Heroes';
}
