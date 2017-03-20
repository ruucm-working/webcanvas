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

import { QuillEditorModule } from "./_quill_editor/quillEditor.module";
// import { QuillEditorComponentExample01 } from './01-example.component';
// import { PlaygModule } from "playg"
// import { Autosize } from 'angular2-autosize/angular2-autosize';
// import { Autosize } from 'angular2-autosize';

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
		// Autosize
		// QuillEditorComponentExample01
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		MaterialModule,
		FlexLayoutModule.forRoot(),
		QuillEditorModule
		// PlaygModule
	],
	providers: [
		MnFullpageService,
		AlertService,
		],
	bootstrap: [ MyCanvas ]
})
export class AppModule {}
