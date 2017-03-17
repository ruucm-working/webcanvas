import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MyCanvas } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent }     from './heroes.component';
import { HeroService }         from './hero.service';
import { DashboardComponent }         from './dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { CanvasesComponent } from './canvases.component';
import { ProjectsComponent } from './projects.component';
import { WordsComponent } from './words.component';
import { HomeComponent } from './home.component';
import { MnFullpageService } from "ng2-fullpage";
import { SliderDashboardComponent } from './slider-dashboard.component';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { HttpModule } from '@angular/http';

// import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';


@NgModule({
	declarations: [
		MyCanvas,
		HeroDetailComponent,
		HeroesComponent,
		DashboardComponent,
		CanvasesComponent,
		ProjectsComponent,
		WordsComponent,
		HomeComponent,
		SliderDashboardComponent,
		AlertComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpModule
	],
	providers: [
		HeroService,
		MnFullpageService,
		AuthGuard,
		AlertService,
		AuthenticationService,
		UserService,

		// providers used to create fake backend
		fakeBackendProvider,
		MockBackend,
		BaseRequestOptions
		],
	bootstrap: [ MyCanvas ]
})
export class AppModule {}