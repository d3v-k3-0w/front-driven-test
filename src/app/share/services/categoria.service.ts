import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from '../utils/helper';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  public listarCategorias() {
    return this.http.get(`${baseURL}/api/categoria/listar-all`);
  }

  public guardarCategoria(categoria: any) {
    return this.http.post(`${baseURL}/api/categoria/registrar`, categoria);
  }
}
