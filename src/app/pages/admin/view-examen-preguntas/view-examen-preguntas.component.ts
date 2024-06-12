import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/share/services/pregunta.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrls: ['./view-examen-preguntas.component.css'],
})
export class ViewExamenPreguntasComponent {
  idExamen: any;
  titulo: any;

  preguntas: any = [];

  constructor(
    private route: ActivatedRoute,
    private preguntaSrvc: PreguntaService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.idExamen = this.route.snapshot.params['idExamen'];
    this.titulo = this.route.snapshot.params['titulo'];

    this.preguntaSrvc.listarPreguntasDelExamen(this.idExamen).subscribe(
      (data: any) => {
        console.log(data);
        this.preguntas = data; //guardar la data en el arreglo de preguntas
      },
      (err) => {
        console.log(err);
      }
    );
  }

  eliminarPregunta(idPregunta: any) {
    Swal.fire({
      title: 'Eliminar pregunta',
      text: '¿Estas seguro, quieres eliminar esta pregunta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.preguntaSrvc.eliminarPregunta(idPregunta).subscribe(
          (data) => {
            this.snack.open('Pregunta eliminada', '', {
              duration: 2000,
            });

            this.preguntas = this.preguntas.filter(
              (pregunta: any) => pregunta.idPregunta != idPregunta
            );
          },
          (err) => {
            this.snack.open('Error al eliminar la pregunta', '', {
              duration: 2000,
            });

            console.log(err);
          }
        );
      }
    });
  }
}
