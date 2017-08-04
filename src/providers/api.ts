import { Injectable, NgZone } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { PopoverController, ToastController, Events } from "ionic-angular";
import { Storage } from '@ionic/storage';



// import { BackgroundMode } from "@ionic-native/background-mode";
// import { OneSignal } from "@ionic-native/onesignal";
// import { Device } from "@ionic-native/device";
// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';
import moment from 'moment';
declare var window: any;
moment.locale('es');
// window.Pusher = Pusher;

@Injectable()
export class Api {
  sound: HTMLAudioElement;
  // url = "http://newton.eycproveedores.com/serrezuela/public/";
  url = "http://localhost/newton/public/";
  username = "";
  password = "";
  user;
  tickets: any = [];
  categorias: any = [];
  resolve;
  ready: Promise<any> = new Promise((resolve) => {
    this.resolve = resolve;
  });
  constructor(public http: Http, public storage: Storage, public zone: NgZone, public events: Events) {
    storage.ready().then(() => {
      storage.get('user').then(user => {
        this.user = user
        console.log(user);
        this.resolve(user);
      });
      this.events.subscribe('stopSound', () => {
        if (this.sound)
          this.sound.pause();
      });

    });
  }

  doLogin() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "api/login", { headers: this.setHeaders() })
        .map(res => res.json())
        .subscribe(data => {
          this.user = data.user;
          resolve(data);
        }, error => {
          return reject(this.handleData(error));
        });
    });
  }

  get(uri) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "api/" + uri, { headers: this.setHeaders() })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          return reject(this.handleData(error));
        });
    });
  }

  post(uri, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "api/" + uri, data, { headers: this.setHeaders() })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          return reject(this.handleData(error));
        });
    });
  }

  put(uri, data) {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + "api/" + uri, data, { headers: this.setHeaders() })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          return reject(this.handleData(error));
        });
    });
  }

  delete(uri) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + "api/" + uri, { headers: this.setHeaders() })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          return reject(this.handleData(error));
        });
    });
  }

  saveData(userData) {
    this.user = userData.user;
    this.storage.set('user', this.user);
  }

  loginOAuth(userData) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "api/login/oauth", userData, {})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          return reject(this.handleData(error));
        });
    });
  }


  /*
  pushRegister() {
    this.onesignal.startInit("ebf07feb-3c76-4639-8c87-b1e7a2e9ddd8", "425679220353");
    this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.Notification);
    this.onesignal.syncHashedEmail(this.user.email);
    this.onesignal.sendTag("user_id", this.user.id);
    this.onesignal.sendTag("residence_id", this.user.residence_id);
    this.onesignal.handleNotificationReceived().subscribe((not) => {
      console.log("push notification received", not);
    }, console.warn);

    this.onesignal.handleNotificationOpened().subscribe((not) => {
      console.log("push notification opened", not);
    }, console.warn);

    this.onesignal.endInit();
    this.onesignal.getIds().then((ids: any) => {
      console.log("onesignal ids", ids)
      var data = {
        token: ids.userId,
        user_id: this.user.id,
        platform: this.device.platform,
        model: this.device.model,
        version: this.device.version,
      };
      this.post('register-push-device', data)
        .then((response) => {
          console.log('device registered:', response);
        })
        .catch(console.error);
    }).catch(console.error);
  }
  */


  private setHeaders() {
    let headers = new Headers();
    if (this.user && this.user.token)
      headers.append("Auth-Token", this.user.token);
    else
      headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    return headers;
  }

  private handleData(res) {
    if (res.statusText == "Ok") {
      return { status: "No Parace haber conexión con el servidor" };
    }

    // If request fails, throw an Error that will be caught
    if (res.status < 200 || res.status >= 300) {
      return { error: res.status }
    }
    // If everything went fine, return the response
    else {
      return res;
    }
  }

  playSoundNotfication() {
    this.sound = new Audio('assets/sounds/notifcations.mp3');
    this.sound.play();
    return this.sound;
  }

  playSoundBeep() {
    this.sound = new Audio('assets/sounds/beep.mp3');
    this.sound.play();
    return this.sound;
  }

}
