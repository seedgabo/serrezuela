import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Api } from "../../providers/api";
import { AddTicketPage } from "../add-ticket/add-ticket";

@Component({
	selector: 'page-ver-ticket',
	templateUrl: 'ver-ticket.html',
})
export class VerTicketPage {
	ticket
	seguimiento = "";
	disabled = false;
	constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public actionsheet: ActionSheetController) {
		this.ticket = this.navParams.get('ticket')
	}

	ionViewDidLoad() {
		this.getTicket();
	}
	getTicket(refresher = null) {
		this.api.get('tickets/' + this.ticket.id + '?with[]=image&with[]=categoria&with[]=comentarios&with[]=user&with[]=guardian')
			.then((data) => {
				this.ticket = data;
				this.api.get('comentarios_tickets?where[ticket_id]=' + this.ticket.id + '&with[]=user')
					.then((comentarios) => {
						this.ticket.comentarios = comentarios;
						if (refresher)
							refresher.complete()
					})
					.catch((err) => {
						console.error(err);
						if (refresher)
							refresher.complete()
					});
			})
			.catch((err) => {
				console.error(err);
				if (refresher)
					refresher.complete()
			})
	}

	comentarioFilters() {
		if (!this.ticket && !this.ticket.comentarios) {
			return []
		}
		return this.ticket.comentarios;
	}

	addSeguimiento() {
		this.disabled = true;
		this.api.post('comentarios_tickets?with[]=user', { user_id: this.api.user.id, ticket_id: this.ticket.id, texto: this.seguimiento, publico: true })
			.then((data) => {
				this.disabled = false;
				this.ticket.comentarios.push(data);
				this.seguimiento = "";
			})
			.catch((err) => {
				console.error(err)
				this.disabled = false;
			})

	}

	deleteComentario(coment, i) {
		this.api.delete('comentarios_tickets/' + coment.id)
			.then(() => {
				this.ticket.comentarios.splice(i, 1);
			})
			.catch(console.error)
	}
	options() {
		this.actionsheet
			.create({
				buttons: [
					{
						icon: 'checkmark',
						text: 'Marcar como Completado',
						handler: () => {
							this.updateTicket({ estado: 'completado' })
						}
					},

					{
						icon: 'create',
						text: 'Editar',
						handler: () => {
							this.editTicket()
						}
					},
					{
						icon: 'trash',
						text: 'Eliminar',
						role: 'destructive',
						handler: () => {
							this.deleteTicket()
						}
					},

				]
			}).present();
	}
	updateTicket(opts) {
		this.api.put('tickets/' + this.ticket.id, opts)
			.then((data) => { })
			.catch(console.error)
	}
	deleteTicket() {
		this.api.delete('tickets/' + this.ticket.id)
			.then((data) => {
				this.navCtrl.pop();
			})
			.catch(console.error)
	}
	editTicket() {
		this.navCtrl.push(AddTicketPage, { ticket: this.ticket })
	}

}
