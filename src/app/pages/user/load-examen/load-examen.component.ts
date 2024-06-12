import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from 'src/app/share/services/examen.service';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css'],
})
export class LoadExamenComponent {
  idCat: any;
  examenes: any;

  constructor(
    private route: ActivatedRoute,
    private examenSrvc: ExamenService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idCat = params['idCat'];

      if (this.idCat == 0) {
        this.examenSrvc.obtenerExamenesActivos().subscribe(
          (data) => {
            this.examenes = data;
            console.log(this.examenes);
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.examenSrvc.obtenerExamenesActivosCategoria(this.idCat).subscribe(
          (data: any) => {
            this.examenes = data;

            console.log(this.examenes);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
}
