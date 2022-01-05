import { DocumentReference } from "@angular/fire/compat/firestore";

export class Inscripcion{
    fecha: Date;
    fechaFinal: Date;
    cliente:DocumentReference;
    tipoInscripcion: DocumentReference;
    subTotal: number;
    iva: number;
    total: number;

    constructor(){
        this.fecha = this.fecha;
        this.fechaFinal = this.fechaFinal;
        this.cliente = this.cliente;
        this.tipoInscripcion = this.tipoInscripcion;
        this.subTotal = this.subTotal;
        this.iva = this.iva;
        this.total = this.total;
    }
}