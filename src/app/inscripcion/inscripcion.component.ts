import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';
import { Precio } from '../models/precio';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  precioSeleccionado: Precio = new Precio();
  precios: Precio[] = new Array<Precio>();
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('precios').get().subscribe((resultado) => {
      resultado.docs.forEach((item) => {
        let precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref

        this.precios.push(precio);
      })
    })
  }

  asignarCliente(cliente: Cliente) {
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente() {
    this.clienteSeleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }

  guardar() {
    console.log(this.inscripcion);
  }

  seleccionoPrecio(event: any) {
    this.precioSeleccionado = this.precios.find(x => x.id == event.target.value);
    this.inscripcion.tipoInscripcion = this.precioSeleccionado.ref;

    this.inscripcion.fecha = new Date();

    if (this.precioSeleccionado.tipoDuracion == 1) {
      let dias: number = this.precioSeleccionado.duracion * 1;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
    }
    if (this.precioSeleccionado.tipoDuracion == 2) {
      let dias: number = this.precioSeleccionado.duracion * 7;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
    }
    if (this.precioSeleccionado.tipoDuracion == 3) {
      let dias: number = this.precioSeleccionado.duracion * 15;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
    }
    if (this.precioSeleccionado.tipoDuracion == 4) {
      let anio: number = this.inscripcion.fecha.getFullYear();
      let meses: number = Number(this.precioSeleccionado.duracion) + Number(this.inscripcion.fecha.getMonth());
      let dia: number = this.inscripcion.fecha.getDate()
      let fechaFinal = new Date(anio, meses, dia);
      this.inscripcion.fechaFinal = fechaFinal;
    }
    if (this.precioSeleccionado.tipoDuracion == 5) {
      let anio: number = Number(this.inscripcion.fecha.getFullYear()) + Number(this.precioSeleccionado.duracion);
      let meses: number = this.inscripcion.fecha.getMonth();
      let dia: number = this.inscripcion.fecha.getDate()
      let fechaFinal = new Date(anio, meses, dia);
      this.inscripcion.fechaFinal = fechaFinal;
    }
  }
}
