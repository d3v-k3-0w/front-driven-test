import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from 'src/app/share/services/examen.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css'],
})
export class InstruccionesComponent {
  idExamen: any;
  examen: any = new Object();

  constructor(
    private examenSrvc: ExamenService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idExamen = this.route.snapshot.params['idExamen'];
    this.examenSrvc.obtenerExamen(this.idExamen).subscribe(
      (data: any) => {
        console.log(data);

        this.examen = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  empezarExamen() {
    Swal.fire({
      title: '¿Quieres comenzar el examen?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Empezar',
      icon: 'info',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start/' + this.idExamen]);
      }
    });
  }
}
