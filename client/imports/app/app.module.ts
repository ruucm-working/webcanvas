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

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { LoginComponent } from './_simple_login/login.component';
import { PrivateComponent } from './_simple_login/private.component';
import { RegisterComponent } from './_simple_login/register.component';
import { AdminComponent } from './_admin/admin.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import './__external_lib/mo.min.js';
import './__external_lib/mojs-player.min.js';

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
		RegisterComponent,
		AdminComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		MaterialModule,
		FlexLayoutModule.forRoot(),
		FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
	],
	providers: [
		MnFullpageService,
		AlertService,
		],
	bootstrap: [ MyCanvas ]
})
export class AppModule {}
