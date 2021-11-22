import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';
  usuario: any;
  cargando: boolean = true;
  constructor(private auth: AngularFireAuth) {
    this.auth.user.subscribe((user) => {
      setTimeout(() => {
        this.cargando = false;
        this.usuario = user;
      }, 2000);
    });
  }

  login() {
    this.auth.signInWithEmailAndPassword('celestino97@gmail.com', '123456');
  }
  logout() {
    this.auth.signOut();
  }
}
