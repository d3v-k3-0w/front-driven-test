import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/share/services/pregunta.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css'],
})
export class AddPreguntaComponent {
  idExamen: any;
  titulo: any;
  pregunta: any = {
    examen: {},
    contenido: '',
    opcion1: '',
    opcion2: '',
    opcion3: '',
    opcion4: '',
    respuesta: '',
  };

  constructor(
    private route: ActivatedRoute,
    private preguntaSrvc: PreguntaService
  ) {}

  ngOnInit(): void {
    this.idExamen = this.route.snapshot.params['idExamen'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.pregunta.examen['idExamen'] = this.idExamen;
  }

  formSubmit() {
    if (
      this.pregunta.contenido.trim() == '' ||
      this.pregunta.contenido == null
    ) {
      return;
    }
    if (this.pregunta.opcion1.trim() == '' || this.pregunta.opcion1 == null) {
      return;
    }
    if (this.pregunta.opcion2.trim() == '' || this.pregunta.opcion2 == null) {
      return;
    }
    if (this.pregunta.opcion3.trim() == '' || this.pregunta.opcion3 == null) {
      return;
    }
    if (this.pregunta.opcion4.trim() == '' || this.pregunta.opcion4 == null) {
      return;
    }
    if (
      this.pregunta.respuesta.trim() == '' ||
      this.pregunta.respuesta == null
    ) {
      return;
    }

    this.preguntaSrvc.guardarPregunta(this.pregunta).subscribe(
      (data) => {
        Swal.fire(
          'Pregunta Guardada',
          'La pregunta a sido agregada con exito',
          'success'
        );

        this.pregunta.contenido = '';
        this.pregunta.opcion1 = '';
        this.pregunta.opcion2 = '';
        this.pregunta.opcion3 = '';
        this.pregunta.opcion4 = '';
        this.pregunta.respuesta = '';
      },
      (err) => {
        Swal.fire(
          'Error',
          'Error al guardar la pregunta en la base de datos',
          'error'
        );
        console.log(err);
      }
    );
  }
}
