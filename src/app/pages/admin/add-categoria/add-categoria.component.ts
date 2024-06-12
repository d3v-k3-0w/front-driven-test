import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/share/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css'],
})
export class AddCategoriaComponent {
  categoria = {
    titulo: '',
    descripcion: '',
  };

  constructor(
    private categoriaSrvc: CategoriaService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  formSubmit() {
    if (this.categoria.titulo.trim() == '' || this.categoria.titulo == null) {
      this.snack.open('El título es requerido !!', '', { duration: 3000 });

      return;
    }

    this.categoriaSrvc.guardarCategoria(this.categoria).subscribe(
      (data: any) => {
        this.categoria.titulo = '';
        this.categoria.descripcion = '';
        Swal.fire(
          'Categoría Agregada',
          'La categoria a sido agregada con exito!',
          'success'
        );
        this.router.navigate(['/admin/categorias']);
      },
      (err) => {
        console.log(err);
        Swal.fire('Error!!', 'Error al guardar la categoria', 'error');
      }
    );
  }
}
