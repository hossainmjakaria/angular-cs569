import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './models/types.model';
import { UserService } from './services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  template: `
    <form class="needs-validation" [formGroup]="signupForm" (ngSubmit)="signup()">
      <h1 class="h3 mb-3 fw-normal">Please register</h1>

      <div class="mb-3">
        <label for="fullname" class="form-label">Full name</label>
        <input type="text" formControlName="fullname" class="form-control" id="fullname" >
        <div  class="invalid-feedback d-block" *ngIf="fullname?.invalid && (fullname?.dirty|| fullname?.touched)">
          <div *ngIf="fullname?.errors?.['required']">Full name is required</div>
        </div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" formControlName="email" class="form-control" id="email" >
        <div  class="invalid-feedback d-block" *ngIf="email?.invalid && (email?.dirty|| email?.touched)">
          <div *ngIf="email?.errors?.['required']">Email is required</div>
          <div *ngIf="email?.errors?.['email']">Email address is not valid</div>
        </div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" formControlName="password" class="form-control" id="password" >
        <div  class="invalid-feedback d-block" *ngIf="password?.invalid && (password?.dirty|| password?.touched)">
          <div *ngIf="password?.errors?.['required']">Password is required</div>
          <div *ngIf="password?.errors?.['minlength']">Password must be at least 6 characters long.</div>
        </div>
      </div>

      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input type="password" formControlName="confirmPassword" class="form-control" id="confirmPassword">
        <div  class="invalid-feedback d-block" *ngIf="confirmPassword?.invalid && (confirmPassword?.dirty|| password?.touched)">
          <div *ngIf="confirmPassword?.errors?.['required']">Confirm password is required</div>
          <div *ngIf="confirmPassword?.errors?.['mismatch']">Confirm password must be match with password</div>
        </div>
      </div>

      <button class="btn btn-primary" type="submit" [disabled]="!signupForm.valid">Register</button>
    </form>
  `,
  styles: [
  ]
})
export class SignupComponent {
  #userService = inject(UserService);
  #router = inject(Router);
  #toastr = inject(ToastrService);

  signupForm = inject(FormBuilder).nonNullable.group({
    fullname: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmPassword: ['', Validators.required],
  }, { validators: this.matchPassword });

  get fullname() { return this.signupForm.get('fullname') }
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }
  get confirmPassword() { return this.signupForm.get('confirmPassword') }

  signup() {
    this.#userService.signUp(this.signupForm.value as User)
      .subscribe(({ success, data }) => {
        if (success) {
          this.#toastr.success('Thank you for registering! You can now log in to your account.');
          this.#router.navigate(['', 'signin']);
        }
      });
  }

  matchPassword(control: AbstractControl): { [s: string]: boolean } | null {
    return control.get('password')?.value === control.get('confirmPassword')?.value
      ? null : { mismatch: true }
  }
}
