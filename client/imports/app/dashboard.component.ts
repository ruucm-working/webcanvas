import template from "./dashboard.component.html";
import style from './dashboard.component.css';
import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
	selector: 'my-dashboard',
	template,
	style
})
export class DashboardComponent {
	heroes: Hero[] = [];

	constructor(private heroService: HeroService) { }

	ngOnInit(): void {
		this.heroService.getHeroes()
			.then(heroes => this.heroes = heroes.slice(1,5));
	}
} 
