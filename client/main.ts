import 'zone.js';
import 'reflect-metadata';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Meteor } from 'meteor/meteor';
import { AppModule } from './imports/app/app.module';
import {enableProdMode} from '@angular/core';

enableProdMode();
Meteor.startup(() => {
	platformBrowserDynamic().bootstrapModule(AppModule);
});
Meteor._reload.onMigrate(function() {
	return [false];
});
