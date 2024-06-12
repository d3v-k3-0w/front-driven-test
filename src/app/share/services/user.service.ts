import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Usuario } from '../interfaces/user.interface';
import baseURL from '../utils/helper';

@Injectable({ providedIn: 'root' })
export class UserService {
  public loginStatusSubject = new Subject<boolean>();
  public username: string | null = null;

  constructor(private httpClient: HttpClient) {}

  public addUsuario(user: Usuario) {
    return this.httpClient.post<Usuario>(`${baseURL}/api/user/registrar`, user);
  }
}
