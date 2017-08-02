import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
	constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
		this.user = {
			nombre: this.api.user.nombre,
			email: this.api.user.email,
			departamento: 'Socio',
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
				this.api.username = data.username
				this.api.user.departamento = data.departamento;
				this.api.saveData(this.api.user);
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
					this.api.saveData(this.api.user);
				})
				.catch((err) => {
					console.error(err);
				});
		};
	}
}
