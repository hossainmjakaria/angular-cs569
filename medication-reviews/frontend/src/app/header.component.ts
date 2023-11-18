import { Component, inject } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  template: `
      <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">

      
      <a href="/medication" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src="assets/logo.png" class="bi me-2" width="36">
        <span class="fs-4 fw-medium">medication reviews</span>
      </a>

      <ul class="nav nav-pills"  *ngIf="!userService.isLoggedIn() else welcome">
        <li class="nav-item"><a [routerLink]="['', 'signin']"  class="nav-link">Sign in</a></li>
        <li class="nav-item"><a [routerLink]="['', 'signup']" class="nav-link">Register</a></li>
        <li class="nav-item"><a [routerLink]="['', 'medication']" class="nav-link">Browse drugs</a></li>
      </ul>

      <ng-template #welcome>
        <!-- Welcome, {{userService.medicationSignal().fullname}} -->
        <ul class="nav nav-pills">
          <li class="nav-item"><a [routerLink]="['', 'medication']" class="nav-link">Browse</a></li>
          <li class="nav-item"><a [routerLink]="['', 'medication', 'entry']" class="nav-link">Create</a></li>
          <li class="nav-item"><a (click)="logout()" class="nav-link">Logout</a></li>
        </ul>
      </ng-template>
    </header>
  `,
  styles: [
  ]
})
export class HeaderComponent {
  userService = inject(UserService);
  #router = inject(Router);
  #toastr = inject(ToastrService);

  constructor() {
    if (!this.userService.isLoggedIn()) {
      this.#router.navigate(['', 'medication']);
    }
  }

  logout() {
    this.userService.medicationSignal.set({ _id: '', email: '', fullname: '', jwt: '' });
    localStorage.clear();
    this.#toastr.success('Your session has ended. Please log in again to continue.');
    this.#router.navigate(['', 'signin']);
  }
}
