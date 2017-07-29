import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { Api } from "../../providers/api";

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(public navController: NavController, public api: Api, public alert: AlertController, public loading: LoadingController) { }

  doLogin() {
    let loader = this.loading.create({
      content: "Iniciando Sesión...",
      duration: 3000
    });
    loader.present();
    this.api.doLogin().then((data: any) => {
      console.log(data);
      if (data.nombre) {
        this.api.user = data;
        this.api.saveData({ user: data });
        loader.dismiss();
        this.navController.setRoot(HomePage);
      }
      else {
        loader.dismiss().then(() => {
          this.alert.create({ title: "Error", message: "Usuario y Contraseña Invalidos", buttons: ["ok"] }).present();
        });
      }
    })
      .catch((err: any) => {
        loader.dismiss().then(() => {
          this.alert.create({ title: "Error", message: "Error al iniciar sesión", buttons: ["ok"] }).present();
        });
      });
  }
}
