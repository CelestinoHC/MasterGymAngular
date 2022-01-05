import { Component, OnInit } from '@angular/core';
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
  constructor(private fb: FormBuilder, private storage: AngularFireStorage) { }

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
    console.log(this.formularioCliente.value);
  }

  subirImagen(evento: any) {
    let nombre = new Date().getTime().toString();
    let archivo = evento.target.files[0];
    let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
    let ruta = 'clientes/' + nombre + extension;
    const referencia = this.storage.ref(ruta);
    const tarea = referencia.put(archivo);

    tarea.then((objeto)=>{
      referencia.getDownloadURL().subscribe((url)=>
      {
        console.log(url);
      })
    })

    tarea.percentageChanges().subscribe((porcentaje) => {
      if (porcentaje != null)
        this.porcentajeSubida = parseInt(porcentaje.toString());
    })

  }

}
