import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MyCanvas } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CanvasesComponent } from './canvases.component';
import { ProjectsComponent } from './projects.component';
import { WordsComponent } from './words.component';
import { HomeComponent } from './home.component';
import { MnFullpageService } from "ng2-fullpage";
import { SliderDashboardComponent } from './slider-dashboard.component';

import { AlertComponent } from './_directives/index';
import { AlertService } from './_services/index';
/*
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
*/

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { LoginComponent } from './_simple_login/login.component';
import { PrivateComponent } from './_simple_login/private.component';
import { RegisterComponent } from './_simple_login/register.component';

@NgModule({
	declarations: [
		MyCanvas,
		CanvasesComponent,
		ProjectsComponent,
		WordsComponent,
		HomeComponent,
		SliderDashboardComponent,
		AlertComponent,
		LoginComponent,
		PrivateComponent,
		RegisterComponent
		// LoginComponent,
		// RegisterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		// HttpModule,
		MaterialModule,
		FlexLayoutModule.forRoot()
	],
	providers: [
		MnFullpageService,
		// AuthGuard,
		AlertService,
		// AuthenticationService,
		// UserService,

		// providers used to create fake backend
		// fakeBackendProvider,
		// MockBackend,
		// BaseRequestOptions
		],
	bootstrap: [ MyCanvas ]
})
export class AppModule {}