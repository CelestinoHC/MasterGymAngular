import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from '../models/precio';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecios: FormGroup;
  listaPrecios: Precio[] = new Array<Precio>();
  esEditar: boolean = false;
  id: string;
  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private msg: MensajesService) { }

  ngOnInit(): void {
    this.formularioPrecios = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })

    this.mostrarPrecio();
  }

  mostrarPrecio(){
    this.db.collection('precios').get().subscribe((resultado) => {
      this.listaPrecios.length = 0;
      resultado.docs.forEach((dato) => {
        let precio: any = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.listaPrecios.push(precio);
      })
    })
  }

  agregar() {
    this.db.collection('precios').add(this.formularioPrecios.value).then(() => {
      this.msg.mensajeExito('Agregado!', 'Se agrego corractamente');
      this.formularioPrecios.reset();
      this.mostrarPrecio();
    }).catch(() => {
      this.msg.mensajeError('Error!', 'Ha ocurrido un error')
    })
  }

  editarPrecio(precio: Precio) {
    this.esEditar = true;
    this.formularioPrecios.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })
    this.id = precio.id;
  }

  editar() {
    this.db.doc('precios/' + this.id).update(this.formularioPrecios.value).then(() => {
      this.msg.mensajeExito('Editado!', 'Editado con exito');
      this.formularioPrecios.reset();
      this.esEditar = false;
      this.mostrarPrecio();
    }).catch(() => {
      this.msg.mensajeError('Error!', 'Ha ocurrido un error')
    })
  }

}
