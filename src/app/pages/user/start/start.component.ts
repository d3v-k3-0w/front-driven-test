import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/share/services/pregunta.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent {
  idExamen: any;
  preguntas: any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;
  isSended = false;
  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private preguntaSrvc: PreguntaService
  ) {}

  ngOnInit(): void {
    this.prevenirBotonRetroceso();
    this.idExamen = this.route.snapshot.params['idExamen'];

    console.log(this.idExamen);

    this.cargarPreguntas();
  }

  iniciarTemporizador() {
    let tiempo = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluarExamen();
        clearInterval(tiempo);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  prevenirBotonRetroceso() {
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null!, location.href);
    });
  }

  cargarPreguntas() {
    this.preguntaSrvc.listarPreguntasDelExamenPrueba(this.idExamen).subscribe(
      (data: any) => {
        console.log(data);
        this.preguntas = data;

        this.timer = this.preguntas.length * 2 * 60;

        this.preguntas.forEach((preg: any) => {
          preg['respuestaDada'] = '';
        });
        console.log(this.preguntas);
        this.iniciarTemporizador();
      },
      (err) => {
        console.log(err);
        Swal.fire(
          'Error',
          'Error al cargar las preguntas de la prueba',
          'error'
        );
      }
    );
  }

  enviarExamen() {
    Swal.fire({
      title: '¿Quieres enviar el examen?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evaluarExamen();
      }
    });
  }

  evaluarExamen() {
    this.preguntaSrvc.evaluarExamen(this.preguntas).subscribe(
      (data: any) => {
        console.log(data);
        this.puntosConseguidos = data.puntosMaximos;
        this.respuestasCorrectas = data.respuestasCorrectas;
        this.intentos = data.intentos;

        this.isSended = true;
      },
      (err) => {
        console.log(err);
      }
    );

    /*this.isSended = true;

    this.preguntas.forEach((preg: any) => {
      if (preg.respuestaDada == preg.respuesta) {
        this.respuestasCorrectas++;
        let puntos = this.preguntas[0].examen.puntosMax / this.preguntas.length;
        this.puntosConseguidos += puntos;
      }

      if (preg.respuestaDada.trim() != '') {
        this.intentos++;
      }
    });

    console.log('Respuestas correctas: ' + this.respuestasCorrectas);
    console.log('Puntos conseguidos: ' + this.puntosConseguidos);
    console.log('Intentos:' + this.intentos);

    console.log(this.preguntas);*/
  }

  obtenerHoraFormateada() {
    let minutos = Math.floor(this.timer / 60);
    let segundos = this.timer - minutos * 60;

    return `${minutos} : min : ${segundos} seg`;
  }

  imprimirPagina() {
    window.print();
  }
}
