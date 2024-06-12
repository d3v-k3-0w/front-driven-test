import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/share/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css'],
})
export class ViewCategoriasComponent {
  categorias: any = [];

  constructor(private categoriaSrvc: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaSrvc.listarCategorias().subscribe(
      (dato: any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      (err) => {
        console.log(err);
        Swal.fire('Error al cargar las categorias!!', 'err');
      }
    );
  }
}
