import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { JWT, User } from './models/types.model';
import { UserService } from './services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signIn',
  template: `
    <form class="needs-validation" [formGroup]="signInForm" (ngSubmit)="signIn()">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="mb-3">
        <input type="email" formControlName="email" class="form-control" id="email" placeholder="name@example.com">
        <div  class="invalid-feedback d-block" *ngIf="email?.invalid && (email?.dirty|| email?.touched)">
          <div *ngIf="email?.errors?.['required']">Email address is required</div>
          <div *ngIf="email?.errors?.['email']">Email address is not valid</div>
        </div>
      </div>

      <div class="mb-3">
        <input type="password" formControlName="password" class="form-control" id="floatingPassword" placeholder="Password">
        <div  class="invalid-feedback d-block" *ngIf="password?.invalid && (password?.dirty|| password?.touched)">
          <div *ngIf="password?.errors?.['required']">Password is required</div>
          <div *ngIf="password?.errors?.['minlength']">Password must be at least 6 characters long.</div>
        </div>
      </div>
       <div class="mb-3">
        <div class="invalid-feedback d-block" *ngIf="!isSuccess">
          <div>Invalid email address or password. Please try again.</div>
        </div>
      </div>
      <button class="btn btn-primary" type="submit" [disabled]="!signInForm.valid">Sign in</button>
    </form>
  `,
  styles: [
  ]
})
export class SignInComponent {
  #userService = inject(UserService);
  #toastr = inject(ToastrService);
  #router = inject(Router);
  isSuccess: boolean = true;

  signInForm = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });

  get email() { return this.signInForm.get('email') }
  get password() { return this.signInForm.get('password') }

  signIn() {
    this.#userService.signIn(this.signInForm.value as User)
      .subscribe(({ success, data }) => {
        this.isSuccess = success;
        if (success) {
          const decoded = jwtDecode(data) as JWT;
          const state = { ...decoded, jwt: data };
          this.#userService.medicationSignal.set(state);
          localStorage.setItem('MedicationState', JSON.stringify(state));
          this.#toastr.success('Welcome back! You are now logged in.');
          this.#router.navigate(['', 'medication']);
        }
      });
  }
}
