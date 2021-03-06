import { NotificationesPage } from './../pages/notificationes/notificationes';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MomentModule } from 'angular2-moment';

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { Api } from "../providers/api";
import { TicketsPage } from "../pages/tickets/tickets";
import { AddTicketPage } from "../pages/add-ticket/add-ticket";
import { VerTicketPage } from "../pages/ver-ticket/ver-ticket";


import { CodePush } from '@ionic-native/code-push';
import { ProfilePage } from "../pages/profile/profile";

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		ListPage,
		TicketsPage,
		AddTicketPage,
		VerTicketPage,
		ProfilePage,
		NotificationesPage,
		LoginPage
	],
	imports: [
		BrowserModule,
		HttpModule,
		MomentModule,
		IonicStorageModule.forRoot(),
		IonicModule.forRoot(MyApp),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		ListPage,
		TicketsPage,
		AddTicketPage,
		VerTicketPage,
		ProfilePage,
		NotificationesPage,
		LoginPage
	],
	providers: [
		Api,
		StatusBar, SplashScreen, CodePush,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
