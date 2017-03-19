import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanvasesComponent } from './canvases.component';
import { ProjectsComponent } from './projects.component';
import { WordsComponent } from './words.component';
import { HomeComponent } from './home.component';
import { SliderDashboardComponent } from './slider-dashboard.component';

import { LoginComponent } from './_simple_login/login.component';
import { PrivateComponent } from './_simple_login/private.component';
import { RegisterComponent } from './_simple_login/register.component';
import { AdminComponent } from './_admin/admin.component';

const routes: Routes = [
	{ path: 'home', name: 'Home', component: HomeComponent, useAsDefault:true },
	{ path: 'slider-dashboard', component: SliderDashboardComponent },
	{ path: 'canvas', component: CanvasesComponent },
	{ path: 'projects', component: ProjectsComponent },
	{ path: 'words', component: WordsComponent },
	{	path: '', /*canActivate: [AuthGuard],*/
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{ path: 'login', name: 'Login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'admin', component: AdminComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
