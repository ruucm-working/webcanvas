import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCanvas } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CanvasComponent } from './_canvas/canvas.component';
import { DialogShowCanvasList } from './_canvas/canvas.component';
import { DialogShowWordList } from './_word/words.component';
import { ProjectsComponent } from './_project/projects.component';
import { WordsComponent } from './_word/words.component';
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

import {HttpModule, Http} from "@angular/http";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import './__external_lib/mo.min.js';
import './__external_lib/mojs-player.min.js';
import './__external_lib/mojs-curve-editor.min.js';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "i18n/", ".json");
}

@NgModule({
	declarations: [
		MyCanvas,
		CanvasComponent,
		ProjectsComponent,
		WordsComponent,
		HomeComponent,
		SliderDashboardComponent,
		AlertComponent,
		LoginComponent,
		PrivateComponent,
		RegisterComponent,
		AdminComponent,
		DialogShowCanvasList, DialogShowWordList
	],
	entryComponents: [DialogShowCanvasList, DialogShowWordList],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		MaterialModule,
		FlexLayoutModule.forRoot(),
		FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
		TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
          }
        })
	],
	providers: [
		MnFullpageService,
		AlertService,
		],
	bootstrap: [ MyCanvas ]
})
export class AppModule {}
