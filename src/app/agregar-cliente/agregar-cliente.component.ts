import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  imgPath: string = '';
  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private db: AngularFirestore) { }

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
  }

  agregar() {
    this.formularioCliente.value.imgPath = this.imgPath;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    this.db.collection('clientes').add(this.formularioCliente.value).then((termino) => { })
    this.formularioCliente.reset();
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
