import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  //++ inyecta el servicio LoginService en el interceptor.
  constructor(private loginSrvc: LoginService) {}

  //++ método que intercepta cada solicitud HTTP.
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //++ clona la solicitud HTTP entrante.
    let authReq = req;

    //++ obtener el token de autenticación del servicio LoginService.
    const token = this.loginSrvc.getToken();

    //++ si el token existe...
    if (token != null) {
      //++ clona la solicitud HTTP y añade el token al encabezado Authorization.
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    //++ llama al siguiente manejador en la cadena de interceptores.
    //++ esto finalmente enviará la solicitud al servidor.
    return next.handle(authReq);
  }
}

//++ provee el interceptor para el sistema de inyección de dependencias de Angular.
export const AuthInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS, // la clase o interfaz que se va a proveer.
    useClass: AuthInterceptor, // la clase que se va a instanciar para proveer el servicio.
    multi: true, // si es true, permite que múltiples [clase, proveedor] pares sean fusionados en un solo proveedor de token.
  },
];
