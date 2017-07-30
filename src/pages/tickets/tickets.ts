import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from "../../providers/api";
import { AddTicketPage } from "../add-ticket/add-ticket";
import { VerTicketPage } from "../ver-ticket/ver-ticket";

@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html',
})
export class TicketsPage {
  query = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {

  }
  ionViewDidLoad() {

    this.api.get('categorias_tickets')
      .then((cats: any) => {
        console.log(cats);
        this.api.categorias = cats;
      })
      .catch(console.error)

  }
  ionViewDidEnter() {
    this.api.get('tickets?with[]=categoria&with[]=user&with[]=guardian&where[user_id]=' + this.api.user.id)
      .then((data) => {
        console.log(data)
        this.api.tickets = data;
      });
  }

  filter() {
    if (this.query === "") {
      return this.api.tickets;
    }
    return this.api.tickets.filter((t) => {
      return t.titulo.toLowerCase().indexOf(this.query.toLowerCase()) > -1 ||
        t.contenido.toLowerCase().indexOf(this.query.toLowerCase()) > -1 ||
        t.estado.toLowerCase().indexOf(this.query.toLowerCase()) > -1 ||
        (t.categoria && t.categoria.nombre.toLowerCase().indexOf(this.query.toLowerCase()) > -1)
    });
  }
  verTicket(ticket) {
    this.navCtrl.push(VerTicketPage, { ticket: ticket });
  }

  addTicket() {
    this.navCtrl.push(AddTicketPage);
  }



}
