import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from '../utils/helper';

@Injectable({
  providedIn: 'root',
})
export class ExamenService {
  constructor(private http: HttpClient) {}

  public agregarCuestionario(examen: any) {
    return this.http.post(`${baseURL}/api/examen/registrar`, examen);
  }

  public listarExamenes() {
    return this.http.get(`${baseURL}/api/examen/listar-all`);
  }

  public obtenerExamen(idExamen: any) {
    return this.http.get(`${baseURL}/api/examen/listar/${idExamen}`);
  }

  public listarExamenesCategoria(idCategoria: any) {
    return this.http.get(`${baseURL}/api/examen/categoria/${idCategoria}`);
  }

  public obtenerExamenesActivos() {
    return this.http.get(`${baseURL}/api/examen/activo`);
  }

  public obtenerExamenesActivosCategoria(idCategoria: any) {
    return this.http.get(`${baseURL}/examen/categoria/activo/${idCategoria}`);
  }

  public actualizarExamen(examen: any) {
    return this.http.put(`${baseURL}/api/examen/actualizar`, examen);
  }

  public eliminarExamen(idExamen: any) {
    return this.http.delete(`${baseURL}/api/examen/eliminar/${idExamen}`);
  }
}
