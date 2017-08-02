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

	constructor(public navCtrl: NavController, public api: Api) {

	}

	gotoTickets() {
		this.navCtrl.setRoot(TicketsPage)
	}
	pushProfile() {
		this.navCtrl.push(ProfilePage);
	}

}
