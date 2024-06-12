import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  collapsed = signal(false);

  sidenavWidth = computed(() => (this.collapsed() ? '80px' : '300px'));
}
