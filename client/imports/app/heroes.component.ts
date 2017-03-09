import template from './heroes.component.html';
import style from './heroes.component.css';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';
 
@Component({
	selector: 'my-heroes',
	template,
	style,
})
export class HeroesComponent implements OnInit {
	title = 'Tour of Heroes';
	selectedHero: Hero;
	heroes: Hero[];

	constructor(
		private router: Router,
		private heroService: HeroService) { }
	getHeroes(): void {
		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	}
	ngOnInit(): void {
		this.getHeroes();
	}
	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}
	gotoDetail(): void {
		this.router.navigate(['/detail', this.selectedHero.id]);
	}
}
