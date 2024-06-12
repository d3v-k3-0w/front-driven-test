export interface Rol {
  idRol: number;
  nombreRol: string;
}

export interface Usuario {
  username: string;
  password: string;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  lstRoles: Rol[];
}
