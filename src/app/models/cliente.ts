import { DocumentReference } from "@angular/fire/compat/firestore";

export class Cliente {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    fechaNacimiento: Date;
    imgPath: string;
    telefono: number;
    ref: DocumentReference;

    constructor() {

    }
}