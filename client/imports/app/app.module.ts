import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCanvas } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CanvasComponent, DialogShowCanvasList } from './_canvas/canvas.component';
import { ProjectsComponent } from './_project/projects.component';
import { WordsComponent, DialogShowWordList } from './_word/words.component';
import { AdminComponent, DialogShowFileList } from './_admin/admin.component';
import { HomeComponent } from './home.component';
import { MnFullpageService } from "ng2-fullpage";
import { SliderDashboardComponent } from './slider-dashboard.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from './_simple_login/login.component';
import { PrivateComponent } from './_simple_login/private.component';
import { RegisterComponent } from './_simple_login/register.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { HttpModule, Http } from "@angular/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SafeHtmlPipe } from './safe.html.pipe';
import { ClipboardModule } from 'ngx-clipboard';
import { NotFoundComponent } from './notfound.component';

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
		LoginComponent,
		PrivateComponent,
		RegisterComponent,
		AdminComponent,
		DialogShowCanvasList, DialogShowWordList, DialogShowFileList,
		SafeHtmlPipe,
		NotFoundComponent
	],
	entryComponents: [ DialogShowCanvasList, DialogShowWordList, DialogShowFileList ],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		MaterialModule,
		ClipboardModule,
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
		MnFullpageService
		],
	bootstrap: [ MyCanvas ]
})
export class AppModule {}
