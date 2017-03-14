import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }         from './dashboard.component';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { CanvasComponent } from './canvas.component';
import { ProjectsComponent } from './projects.component';
import { WordsComponent } from './words.component';
import { HomeComponent } from './home.component';
import { SliderDashboardComponent } from './slider-dashboard.component';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'slider-dashboard',
		component: SliderDashboardComponent
	},
	{
		path: 'canvas',
		component: CanvasComponent
	},
	{
		path: 'projects',
		component: ProjectsComponent
	},
	{
		path: 'words',
		component: WordsComponent
	},
	{
		path: 'heroes',
		component: HeroesComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'detail/:id',
		component: HeroDetailComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}