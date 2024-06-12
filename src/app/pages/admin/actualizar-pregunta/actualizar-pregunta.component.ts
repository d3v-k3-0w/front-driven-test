import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from 'src/app/share/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-pregunta',
  templateUrl: './actualizar-pregunta.component.html',
  styleUrls: ['./actualizar-pregunta.component.css'],
})
export class ActualizarPreguntaComponent {
  idPregunta: any = 0;
  pregunta: any;
  examen: any;

  constructor(
    private route: ActivatedRoute,
    private preguntaSrvc: PreguntaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idPregunta = this.route.snapshot.params['idPregunta'];
    this.preguntaSrvc.obtenerPregunta(this.idPregunta).subscribe(
      (data: any) => {
        this.pregunta = data;
        console.log(this.pregunta);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public actualizarDatosPregunta() {
    this.preguntaSrvc.actualizarPregunta(this.pregunta).subscribe((data) => {
      Swal.fire(
        'PreguntaActualizada',
        'La pregunta ha sido actualizada con éxito',
        'success'
      ).then((e) => {
        this.router.navigate([
          '/admin/ver-preguntas/' +
            this.pregunta.examen.idExamen +
            '/' +
            this.pregunta.examen.titulo,
        ]);
      });
    });
  }
}
