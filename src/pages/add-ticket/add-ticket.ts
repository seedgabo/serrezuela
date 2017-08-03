import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from "../../providers/api";

@Component({
	selector: 'page-add-ticket',
	templateUrl: 'add-ticket.html',
})
export class AddTicketPage {
	ticket;
	image;
	constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
		this.ticket = navParams.get('ticket');
		if (!this.ticket)
			this.ticket = { titulo: '', contenido: '', user_id: this.api.user.id, categoria_id: 1, estado: 'abierto' }
	}

	ionViewDidLoad() {
		if (this.api.categorias && this.api.categorias.length > 0)
			this.ticket.categoria_id = this.api.categorias[0].id;
	}
	save() {
		if (this.ticket.id) {
			this.api.put('tickets/' + this.ticket.id, this.ticket)
				.then((data: any) => {
					this.ticket = data;
					if (this.image) {
						this.uploadImage(data.id);
					}
					this.navCtrl.pop();
				})
				.catch(console.error)
		} else {
			this.api.post('tickets', this.ticket)
				.then((data: any) => {
					this.ticket = data;
					if (this.image) {
						this.uploadImage(data.id);
					}
					this.navCtrl.pop();
				})
				.catch(console.error)
		}
	}

	askFile() {
		var filer: any = document.querySelector("#input-file")
		filer.click();
	}
	verFile(event) {
		var reader: any = new FileReader();
		reader.readAsDataURL(event.target.files[0])
		reader.onload = (result) => {
			this.image = result.target.result;
		};
	}

	uploadImage(id) {
		this.api.post('images/upload/tickets/' + id, { image: this.image })
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	canSave() {
		return this.ticket.titulo.length > 3 && this.ticket.categoria_id > 0;
	}
}
