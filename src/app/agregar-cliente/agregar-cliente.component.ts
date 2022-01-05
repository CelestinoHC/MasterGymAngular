import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  imgPath: string = '';
  esEditable: boolean = false;
  id: string;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgPath: ['', Validators.required]
    })

    this.id = this.activeRoute.snapshot.params.clienteID

    if (this.id != undefined) {
      this.esEditable = true;

      this.db.doc<any>('clientes/' + this.id).valueChanges().subscribe((cliente) => {
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substring(0, 10),
          telefono: cliente.telefono,
          imgPath: ''
        });
        this.imgPath = cliente.imgPath;
      });
    }
  }

  agregar() {
    this.formularioCliente.value.imgPath = this.imgPath;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    this.db.collection('clientes').add(this.formularioCliente.value).then((termino) => { })
    this.formularioCliente.reset();
  }

  editar() {
    this.formularioCliente.value.imgPath = this.imgPath;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);

    this.db.doc<any>('clientes/' + this.id).update(this.formularioCliente.value);
  }

  subirImagen(evento: any) {
    if (evento.target.files.length > 0) {
      let nombre = new Date().getTime().toString();
      let archivo = evento.target.files[0];
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
      let ruta = 'clientes/' + nombre + extension;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);

      tarea.then((objeto) => {
        referencia.getDownloadURL().subscribe((url) => {
          this.imgPath = url;
        })
      })

      tarea.percentageChanges().subscribe((porcentaje) => {
        if (porcentaje != null)
          this.porcentajeSubida = parseInt(porcentaje.toString());
      })
    }
  }

}
