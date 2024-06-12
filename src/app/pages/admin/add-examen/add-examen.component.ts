import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/share/services/categoria.service';
import { ExamenService } from 'src/app/share/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css'],
})
export class AddExamenComponent {
  categorias: any = [];

  examenData = {
    titulo: '',
    descripcion: '',
    puntosMax: '',
    numPreguntas: '',
    activo: true,
    categoria: {
      idCategoria: '',
    },
  };

  constructor(
    private categoriaSrvc: CategoriaService,
    private snack: MatSnackBar,
    private examenSrvc: ExamenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaSrvc.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
        console.log(this.categorias);
      },
      (err) => {
        console.log(err);
        Swal.fire('Error !!', 'Error al cargar las categorias', 'error');
      }
    );
  }

  guardarCuestionario() {
    console.log(this.examenData);

    if (this.examenData.titulo.trim() == '' || this.examenData.titulo == null) {
      this.snack.open('El titulo es requerido', '', {
        duration: 2000,
      });

      return;
    }

    this.examenSrvc.agregarCuestionario(this.examenData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Examen guardado',
          'El examen ha sido guardado con exito',
          'success'
        );

        this.examenData = {
          titulo: '',
          descripcion: '',
          puntosMax: '',
          numPreguntas: '',
          activo: true,
          categoria: {
            idCategoria: '',
          },
        };
        this.router.navigate(['admin/examenes']);
      },
      (err) => {
        Swal.fire('Error', 'Error al guardar el examen', 'error');
      }
    );
  }
}
