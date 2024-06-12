import { Component } from '@angular/core';
import { ExamenService } from 'src/app/share/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css'],
})
export class ViewExamenesComponent {
  examenes: any = [];

  constructor(private examenSrvc: ExamenService) {}

  ngOnInit(): void {
    this.examenSrvc.listarExamenes().subscribe(
      (data) => {
        this.examenes = data;
        console.log(this.examenes);
      },
      (err) => {
        console.log(err);
        Swal.fire('error', 'Error al cargar los exámenes', 'error');
      }
    );
  }

  eliminarCuestionario(idExamen: any) {
    Swal.fire({
      title: 'Eliminar examen',
      text: '¿Estás seguro de eliminar el examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenSrvc.eliminarExamen(idExamen).subscribe(
          (data) => {
            this.examenes = this.examenes.filter(
              (exmn: any) => exmn.idExamen != idExamen
            );
            Swal.fire(
              'Examen eliminado',
              'El examen ha sido eliminado con exito',
              'success'
            );
          },
          (err) => {
            Swal.fire('Error', 'Error al eliminar el examen', 'error');
          }
        );
      }
    });
  }
}
