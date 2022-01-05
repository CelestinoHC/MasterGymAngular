import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecios: FormGroup;
  listaPrecios: any[] = new Array<any>();
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

    this.db.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((dato)=>
      {
        let precio: any = dato.data();
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.listaPrecios.push(precio);
      })
    })
  }

  agregar(){
    this.db.collection('precios').add(this.formularioPrecios.value).then(()=>{
      this.msg.mensajeExito('Agregado!', 'Se agrego corractamente');
      this.formularioPrecios.reset();
    }).catch(()=>{
      this.msg.mensajeError('Error!', 'Ha ocurrido un error')
    })
  }

  editar(){

  }

}
