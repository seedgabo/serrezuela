import { Api } from './../../providers/api';
import { VerTicketPage } from './../ver-ticket/ver-ticket';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-notificationes',
  templateUrl: 'notificationes.html',
})
export class NotificationesPage {

  constructor(public navCtrl: NavController, public api: Api) {
    this.getNotificaciones();
  }

  getNotificaciones() {
    this.api.get('getNotificaciones').then((data: any) => {
      this.api.user.notificaciones = data;
    })
  }

  doRefresh(refresher) {
    this.api.get('getNotificaciones').then((data: any) => {
      this.api.user.notificaciones = data;
      refresher.complete();
    })
  }

  desleer(notificacion, slider) {
    this.api.get('notificacion/' + notificacion.id + '/noleida').then((data: any) => { });
    notificacion.leido = 0;
    slider.close();
  }

  leer(notificacion, slider) {
    this.api.get('notificacion/' + notificacion.id + '/leida').then((data: any) => { });
    notificacion.leido = 1;
    slider.close();
  }

  verNotificacion(notificacion) {
    if (notificacion.ticket_id != null) {
      this.navCtrl.push(VerTicketPage, { ticket: { id: notificacion.ticket_id } });
    }
    this.api.get('notificacion/' + notificacion.id + '/leida').then((data: any) => {
      this.getNotificaciones();
    });
  }

}
