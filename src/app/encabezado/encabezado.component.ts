import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  // usuario: User;
  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
    // this.auth.user.subscribe((user) => {
    //   if (user != null)
    //     this.usuario = user;
    // });
  }

  logout() {
    this.auth.signOut();
  }
}
