import { NotificationesPage } from './../notificationes/notificationes';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api } from "../../providers/api";
import { TicketsPage } from "../tickets/tickets";
import { ProfilePage } from "../profile/profile";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	random = 0;
	constructor(public navCtrl: NavController, public api: Api) { }

	ionViewDidEnter() {
		this.random = Math.random() * 2000;
		this.api.get('getNotificaciones')
			.then((data) => {
				this.api.user.notificaciones = data;
			})
			.catch(console.error);
	}
	countNoti() {
		var count = 0
		this.api.user.notificaciones.forEach(element => {
			if (!element.leido) count++;
		});
		return count;
	}
	gotoTickets() {
		this.navCtrl.push(TicketsPage)
	}
	gotoNotificaciones() {
		this.navCtrl.push(NotificationesPage)
	}
	pushProfile() {
		this.navCtrl.push(ProfilePage);
	}

}
