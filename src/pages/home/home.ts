import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api } from "../../providers/api";
import { TicketsPage } from "../tickets/tickets";

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

}
