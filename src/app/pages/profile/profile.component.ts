import { Component } from '@angular/core';
import { LoginService } from 'src/app/share/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: any = null;

  constructor(private loginSrvc: LoginService) {}

  ngOnInit(): void {
    this.user = this.loginSrvc.getUser();
  }
}
