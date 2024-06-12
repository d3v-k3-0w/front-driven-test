import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/share/services/login.service';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styleUrls: ['./sidebard.component.css'],
})
export class SidebardComponent implements OnInit {
  itemActivo = '/admin';

  constructor(public loginSrvc: LoginService, private router: Router) {}

  ngOnInit() {
    if (this.router.url !== '/admin') {
      this.itemActivo = this.router.url;
    }
  }

  logOut() {
    this.loginSrvc.cerrarSession();
    window.location.reload();
  }
}
