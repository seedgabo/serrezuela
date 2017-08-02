import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Api } from "../../providers/api";

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {
	newpassword = ""
	newpassword_confirm = ""
	user = {
		nombre: '',
		email: '',
		departamento: '',
	};
	constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public toast: ToastController) {
		this.user = {
			nombre: this.api.user.nombre,
			email: this.api.user.email,
			departamento: this.api.user.departamento,
		}
	}

	ionViewDidLoad() {
	}

	updateUser() {
		this.api.put('users/' + this.api.user.id, this.user)
			.then((data: any) => {
				console.log(data);
				this.api.user.nombre = data.nombre;
				this.api.user.email = data.email;
				this.api.user.departamento = data.departamento;
				this.api.username = data.username
				var user = JSON.parse(JSON.stringify(this.api.user))
				this.api.saveData({ user: user });
				this.toastUpdated();
			})
			.catch(console.error)
	}
	updatePassword() {

	}

	canUpdate() {
		return this.api.user.nombre.length > 3 && this.api.user.email.length > 3 && this.api.user.email.indexOf("@") > -1 && this.api.user.email.indexOf(".") > -1
	}
	canPassword() {
		return this.newpassword.length > 5 && this.newpassword === this.newpassword_confirm;
	}

	toastUpdated() {
		this.toast.create({ message: "Usuario Actualizado", position: 'bottom', duration: 2000 }).present();
	}

	askFile() {
		var filer: any = document.querySelector("#input-file")
		filer.click();
	}
	verFile(event) {
		var reader: any = new FileReader();
		reader.readAsDataURL(event.target.files[0])
		reader.onload = (result) => {
			var image = result.target.result;
			this.api.post('images/upload/user/' + this.api.user.id, { image: image })
				.then((data: any) => {
					console.log(data);
					this.api.user.imagen = data.image.url;
					var user = JSON.parse(JSON.stringify(this.api.user))
					this.api.saveData({ user: user });
				})
				.catch((err) => {
					console.error(err);
				});
		};
	}
}
