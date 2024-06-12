import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/share/interfaces/user.interface';
import { UserService } from 'src/app/share/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public user: Usuario = {
    username: '',
    password: '',
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    lstRoles: [],
  };

  constructor(private userService: UserService, private snack: MatSnackBar) {}

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('El nombre de usuario es requerido!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    this.userService.addUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario', 'Usuario registrado con exito!', 'success');
      },
      (err) => {
        console.log(err);
        this.snack.open('Ha ocurrido un error en el sistema!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );
  }
}
