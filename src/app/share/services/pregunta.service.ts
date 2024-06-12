import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from '../utils/helper';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  constructor(private http: HttpClient) {}

  public guardarPregunta(pregunta: any) {
    return this.http.post(`${baseURL}/api/pregunta/registrar`, pregunta);
  }

  public listarPreguntasDelExamen(idExamen: any) {
    return this.http.get(`${baseURL}/api/pregunta/all/${idExamen}`);
  }

  public listarPreguntasDelExamenPrueba(idExamen: any) {
    return this.http.get(`${baseURL}/api/pregunta/all/${idExamen}`);
  }

  public evaluarExamen(preguntas: any) {
    return this.http.post(`${baseURL}/api/pregunta/evaluar-examen`, preguntas);
  }

  public obtenerPregunta(idPregunta: any) {
    return this.http.get(`${baseURL}/api/pregunta/${idPregunta}`);
  }

  public actualizarPregunta(pregunta: any) {
    return this.http.put(`${baseURL}/api/pregunta/actualizar`, pregunta);
  }

  public eliminarPregunta(idPregunta: any) {
    return this.http.delete(`${baseURL}/api/pregunta/eliminar/${idPregunta}`);
  }
}
