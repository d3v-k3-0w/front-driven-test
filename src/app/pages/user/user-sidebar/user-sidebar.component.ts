import { Component, Input, computed, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from 'src/app/share/services/categoria.service';
import { LoginService } from 'src/app/share/services/login.service';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent {
  @Input() set collapsed2(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  sideNavCollapsed = signal(false);

  categorias: any; //cambiar tipo

  username: string | null = null;
  userRole: string | null = null;

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));

  menuItems = signal<MenuItem[]>([
    {
      icon: 'quiz',
      label: 'Exámenes',
      route: '/user-dashboard/0',
    },
    {
      icon: 'comment',
      label: 'Comments',
      route: 'comments',
    },
  ]);

  constructor(
    private categoriaSrvc: CategoriaService,
    public loginSrvc: LoginService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.loginSrvc.isLoggedIn()) {
      const user = this.loginSrvc.getUser();
      if (user) {
        this.username = user.nombre;
        this.userRole = this.loginSrvc.getUserRole();
      }
    }

    this.categoriaSrvc.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;

        this.menuItems.set([...this.menuItems()]);
      },
      (err) => {
        this.snack.open('Error al cargar las categorias', '', {
          duration: 2000,
        });
        console.log(err);
      }
    );
  }
}
