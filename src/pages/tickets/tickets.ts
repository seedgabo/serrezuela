import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Api } from "../../providers/api";
import { AddTicketPage } from "../add-ticket/add-ticket";
import { VerTicketPage } from "../ver-ticket/ver-ticket";

@Component({
	selector: 'page-tickets',
	templateUrl: 'tickets.html',
})
export class TicketsPage {
	query = "";
	filters = {
		'completado': true,
		'abierto': true,
		'en curso': true,
	}
	constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public alert: AlertController) {

	}
	ionViewDidLoad() {

		this.api.get('categorias_tickets?where[parent_id]=129')
			.then((cats: any) => {
				console.log(cats);
				this.api.categorias = cats;
			})
			.catch(console.error)

	}
	ionViewDidEnter() {
		this.getTickets();
	}
	getTickets(refresher = null) {
		this.api.get('tickets?with[]=image&with[]=categoria&with[]=user&with[]=guardian&where[user_id]=' + this.api.user.id)
			.then((data) => {
				console.log(data)
				this.api.tickets = data;
				if (refresher)
					refresher.complete();
			})
			.catch((err) => {
				console.error(err);
				if (refresher)
					refresher.complete();
			})
	}

	filter() {
		return this.api.tickets.filter((t) => {
			var resp = true;
			if (this.query !== "")
				resp = t.contenido.toLowerCase().indexOf(this.query.toLowerCase()) > -1 ||
					t.estado.toLowerCase().indexOf(this.query.toLowerCase()) > -1 ||
					(t.categoria && t.categoria.nombre.toLowerCase().indexOf(this.query.toLowerCase()) > -1)

			if (!resp) return false;
			if (!this.filters[t.estado] === undefined) return true;
			return this.filters[t.estado];
		});
	}

	alterFilters() {
		this.alert.create({
			title: "Filtrar Por:",
			inputs: [
				{
					value: 'completado',
					label: 'Completados',
					type: 'checkbox',
					checked: this.filters.completado,
					name: 'completado'
				},
				{
					value: 'abierto',
					label: 'Abiertos',
					type: 'checkbox',
					checked: this.filters.abierto,
					name: 'abierto'
				},
				{
					value: 'en curso',
					label: 'En Curso',
					type: 'checkbox',
					checked: this.filters['en curso'],
					name: 'en curso'
				}
			],
			buttons: [
				{
					text: 'Filtrar',
					handler: (data) => {
						console.log(data);
						this.filters.completado = data.indexOf('completado') > -1;
						this.filters['en curso'] = data.indexOf('en curso') > -1;
						this.filters.abierto = data.indexOf('abierto') > -1;
						console.log(this.filters);
					}
				}
			]
		})
			.present();
	}

	verTicket(ticket) {
		this.navCtrl.push(VerTicketPage, { ticket: ticket });
	}

	addTicket() {
		this.navCtrl.push(AddTicketPage);
	}



}
