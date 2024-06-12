import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../interfaces/user.interface';
import { JwtResponseToken } from '../interfaces/token.interface';
import { Login } from '../interfaces/login.interface';
import baseURL from '../utils/helper';

@Injectable({ providedIn: 'root' })
export class LoginService {
  public loginStatusSubject$ = new Subject<boolean>();
  public username: string | null = null;

  constructor(private httpClient: HttpClient) {}

  //++ el método devuelve un Observable que emitirá el token de inicio de sesión.
  public loginGenerateToken(loginData: Login): Observable<JwtResponseToken> {
    //++ loginData (nombre de usuario y contraseña) se envía como cuerpo de la solicitud POST.
    return this.httpClient.post<JwtResponseToken>(
      `${baseURL}/api/user/login`,
      loginData
    );
  }

  public currentUsuario(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${baseURL}/api/actual-usuario`);
  }

  //++ establecemos el token en el localstorage
  public setToken(token: any) {
    localStorage.setItem('token', token);
  }

  //++ obtener el token
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: Usuario) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): Usuario | null {
    let userStr = localStorage.getItem('user');

    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.cerrarSession();
      return null;
    }
  }
  public getUserRole() {
    let user = this.getUser();

    if (user) {
      return user.lstRoles[0].nombreRol;
    } else {
      return null;
    }
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');

    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //++ cerramos session y eliminamos el token del localStorage
  public cerrarSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return true;
  }
}
