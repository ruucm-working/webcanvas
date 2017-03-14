import template from './app.component.html';
import style from './app.component.css';
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: template,
  style,
})
export class MyCanvas {
  title = 'Tour of Heroes';
}
