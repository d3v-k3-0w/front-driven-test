import { Component, Input, WritableSignal, signal } from '@angular/core';
import { LoginService } from 'src/app/share/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  //++ el tipo WritableSignal indica que se trata de un Signal que permite modificar su valor mediante el método set()
  @Input() collapsed!: WritableSignal<boolean>; // usar ReadOnlySignal<boolean> para solo lectura!!

  constructor(public loginSrvc: LoginService) {}

  toggleCollapsed() {
    this.collapsed.set(!this.collapsed());
  }

  public logOut() {
    this.loginSrvc.cerrarSession();
    window.location.reload();
  }
}
