import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/share/interfaces/login.interface';
import { JwtResponseToken } from 'src/app/share/interfaces/token.interface';
import { LoginService } from 'src/app/share/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: Login = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private loginSrvc: LoginService,
    private router: Router
  ) {}

  formSubmit() {
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username.trim() == null
    ) {
      this.snack.open('El nombre de usuario es requerido!!', 'Aceptar', {
        duration: 3000,
      });

      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password.trim() == null
    ) {
      this.snack.open('la contraseña es requerida!!', 'Aceptar', {
        duration: 3000,
      });

      return;
    }
    this.loginSrvc.loginGenerateToken(this.loginData).subscribe(
      (data: JwtResponseToken) => {
        console.log(data);

        this.loginSrvc.setToken(data.token); // establecer o almacenar el token en el localStorage

        this.loginSrvc.currentUsuario().subscribe((user: any) => {
          this.loginSrvc.setUser(user); // establecer o almacenar el usuario en el localStorage
          this.loginSrvc.username = user.username;

          console.log(user);

          //++ lógica de redirección
          if (this.loginSrvc.getUserRole() == 'ADMIN') {
            this.router.navigate(['admin']); // mostrar el dashboard de admin
            this.loginSrvc.loginStatusSubject$.next(true);
          } else if (this.loginSrvc.getUserRole() == 'USER') {
            this.router.navigate(['user-dashboard/0']); // mostrar el dashboard de user
            this.loginSrvc.loginStatusSubject$.next(true);
          } else {
            this.loginSrvc.cerrarSession();
          }
        });
      },
      (err) => {
        console.log(err);

        this.snack.open('Detalles inválidos, vuelva a intentar!!', 'Aceptar', {
          duration: 2000,
        });
      }
    );
  }
}
