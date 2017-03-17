import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }         from './dashboard.component';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { CanvasesComponent } from './canvases.component';
import { ProjectsComponent } from './projects.component';
import { WordsComponent } from './words.component';
import { HomeComponent } from './home.component';
import { SliderDashboardComponent } from './slider-dashboard.component';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';

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
		component: CanvasesComponent
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
		path: 'detail/:id',
		component: HeroDetailComponent
	},
	{	path: '', component: HomeComponent, canActivate: [AuthGuard]
		// redirectTo: '/home',
		// pathMatch: 'full'
	},
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	// otherwise redirect to home
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}