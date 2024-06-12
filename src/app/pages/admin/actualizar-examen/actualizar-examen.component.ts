import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/share/services/categoria.service';
import { ExamenService } from 'src/app/share/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css'],
})
export class ActualizarExamenComponent {
  idExamen = 0;

  examen: any;

  categorias: any;

  constructor(
    private route: ActivatedRoute,
    private examenSrvc: ExamenService,
    private categoriaSrvc: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idExamen = this.route.snapshot.params['idExamen']; //accediendo al param idExamen de la url

    // alert(this.idExamen);

    this.examenSrvc.obtenerExamen(this.idExamen).subscribe(
      (data) => {
        this.examen = data;

        console.log(this.examen);
      },
      (err) => {
        console.log(err);
      }
    );

    this.categoriaSrvc.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
      },
      (err) => {
        alert('Error al cargar las categorias');
      }
    );
  }

  public actualizarCuestionario() {
    this.examenSrvc.actualizarExamen(this.examen).subscribe(
      (data) => {
        Swal.fire(
          'Examen actualizao',
          'El examen ha sido actualizado con exito',
          'success'
        ).then((e) => {
          this.router.navigate(['/admin/examenes']);
        });
      },
      (err) => {
        Swal.fire(
          'Examen en el sistema',
          'No se ha podido actualizar el examen',
          'error'
        );

        console.log(err);
      }
    );
  }
}
