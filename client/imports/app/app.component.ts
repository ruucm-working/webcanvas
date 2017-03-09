import style from './app.component.css';
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
    	<a routerLink="/dashboard">Dashboard</a>
    	<a routerLink="/heroes">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  style
})
export class MyCanvas {
  title = 'Tour of Heroes';
}
