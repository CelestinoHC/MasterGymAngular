import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>();
  @Input('nombre') nombre: string;
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('clientes').get().subscribe((resultado)=>{
      this.clientes.length = 0;
      resultado.docs.forEach((item)=>{
        let cliente: any = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.visible = false;

        this.clientes.push(cliente);
      });
    });
  }

  buscarCliente(nombre: any){
    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLowerCase().includes(nombre.target.value.toLowerCase()) || cliente.apellido.toLowerCase().includes(nombre.target.value.toLowerCase())){
        cliente.visible = true;
      }
      else{
        cliente.visible = false;
      }
    })
  }

  seleccionarCliente(cliente:Cliente){
    this.nombre = cliente.nombre + ' ' + cliente.apellido;
    this.clientes.forEach((cliente)=>{
      cliente.visible = false;
    })
  }

  cancelarCliente(){
    this.nombre = '';
  }

}
