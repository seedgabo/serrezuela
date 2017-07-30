import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Api } from "../../providers/api";

@Component({
  selector: 'page-add-ticket',
  templateUrl: 'add-ticket.html',
})
export class AddTicketPage {
  ticket;
  categorias = [];
  image;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
    this.ticket = navParams.get('ticket');
    this.ticket = navParams.get('categorias');
    if (!this.ticket)
      this.ticket = { titulo: '', contenido: '', user_id: this.api.user.id, categoria_id: 1, estado: 'abierto' }
  }

  ionViewDidLoad() {

  }
  save() {
    if (this.ticket.id) {
      this.api.put('tickets/' + this.ticket.id, this.ticket)
        .then((data: any) => {
          this.ticket = data;
          this.navCtrl.pop();
        })
        .catch(console.error)
    } else {
      this.api.post('tickets', this.ticket)
        .then((data: any) => {
          this.ticket = data;
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
}
