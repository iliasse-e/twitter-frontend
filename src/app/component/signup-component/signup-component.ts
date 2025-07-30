import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication';

@Component({
  selector: 'signup',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="signup()">

      <label for="username">Username:</label>
      <input id="username" type="text" formControlName="username" required>
      @if (form.get('username')?.invalid && form.get('username')?.touched) {
        @if (form.get('username')?.errors?.['required']) {
          <small>Username is required.</small>
        }
        @else if (form.get('username')?.errors?.['minlength']) {
          <small>Username must be at least 3 characters long.</small>
        }
      }

      <label for="email">Email:</label>
      <input id="email" type="email" formControlName="email" required>
      @if (form.get('email')?.invalid && form.get('email')?.touched) {
        @if (form.get('email')?.errors?.['required']) {
          <small>Email is required.</small>
        }
        @if (form.get('email')?.errors?.['email']) {
          <small>Invalid email format.</small>
        }
      }

      <label for="password">Password:</label>
      <input id="password" type="password" formControlName="password" required>
      @if (form.get('password')?.invalid && form.get('password')?.touched) {
        @if (form.get('password')?.errors?.['required']) {
          <small>Password is required.</small>
        }
        @if (form.get('password')?.errors?.['minlength']) {
          <small>Password must be at least 6 characters long.</small>
        }
      }

      <button type="submit" [disabled]="form.invalid">Sign Up</button>
    </form>
  `,
  styleUrl: './signup-component.css'
})
export class SignupComponent {

  #authenticationService = inject(AuthenticationService);

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  signup() {
    if (this.form.valid) {
      this.#authenticationService.signup(
        this.form.value.username!,
        this.form.value.email!,
        this.form.value.password!
      );
      this.form.reset();
    }
    else {
      console.error('Form invalid');
    }
  }

}
