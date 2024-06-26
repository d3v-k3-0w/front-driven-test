import { Component } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { PreguntaService } from 'src/app/share/services/pregunta.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent {
  idExamen: any;
  preguntas: any[] = [];
  currentPage = 0;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;
  isSended = false;
  respuestasEvaluadas: any[] = [];
  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private preguntaSrvc: PreguntaService
  ) {}

  ngOnInit(): void {
    this.prevenirBotonRetroceso();
    this.idExamen = this.route.snapshot.params['idExamen'];
    this.cargarPreguntas();
  }

  iniciarTemporizador() {
    this.timer = this.preguntas.length * 2 * 60;
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
        this.preguntas = data.map((pregunta: any) => ({
          ...pregunta,
          opciones: this.obtenerOpciones(pregunta),
          respuestaDada: '',
        }));
        this.iniciarTemporizador();
      },
      (err) => {
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
        this.puntosConseguidos = data.puntosMaximos;
        this.respuestasCorrectas = data.respuestasCorrectas;
        this.intentos = data.intentos;
        this.isSended = true;

        this.preguntas.forEach((pregunta, index) => {
          const respuestaEvaluada = {
            pregunta: pregunta.contenido,
            respuestaDada: pregunta.respuestaDada
              ? pregunta.respuestaDada.toLowerCase()
              : '',
            respuestaCorrecta: pregunta.respuesta
              ? pregunta.respuesta.toLowerCase()
              : '',
            correcta:
              pregunta.respuestaDada?.toLowerCase() ===
              pregunta.respuesta?.toLowerCase(),
          };
          this.respuestasEvaluadas.push(respuestaEvaluada);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  obtenerHoraFormateada() {
    let minutos = Math.floor(this.timer / 60);
    let segundos = this.timer - minutos * 60;
    return `${minutos} : min : ${segundos} seg`;
  }

  imprimirPagina() {
    window.print();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.preguntas.length - 1) {
      this.currentPage++;
    }
  }

  obtenerOpciones(pregunta: any): string[] {
    let opciones = [];
    for (let i = 1; i <= 20; i++) {
      if (pregunta[`opcion${i}`]) {
        opciones.push(pregunta[`opcion${i}`]);
      }
    }
    return opciones;
  }
}
