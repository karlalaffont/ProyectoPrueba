export interface Usuario {
    Id: number;
    Nombre: string;
    Cedula: number;
    FechaNacimiento?: Date;
    Email: string;
    Telefono?: number;
    Organizacion: string;
}