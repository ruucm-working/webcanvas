import template from './hero-detail.component.html';
import style from './hero-detail.component.css';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  template,
  style
})
export class HeroDetailComponent implements OnInit {
	constructor(
		private heroService: HeroService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.heroService.getHero(+params['id']))
			.subscribe(hero => this.hero = hero);
	}

	goBack(): void {
		this.location.back();
	}

	@Input()
	hero: Hero;
}
