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

    }
}