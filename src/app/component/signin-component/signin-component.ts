import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication';

@Component({
  selector: 'app-signin-component',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="signin()">
      <label for="email">Email:</label>
      <input id="email" type="email" formControlName="email" required>

      @if (form.get('email')?.invalid && form.get('email')?.touched) {
        @if (form.get('email')?.errors?.['required']) {
          <small>Email is required.</small>
        }
        @else if (form.get('email')?.errors?.['email']) {
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

      <button type="submit" [disabled]="form.invalid">Login</button>
    </form>
  `,
  styleUrl: './signin-component.css'
})
export class SigninComponent {

  #authenticationService = inject(AuthenticationService);

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  signin() {
    if (this.form.valid) {
      this.#authenticationService.signin(this.form.value.email!, this.form.value.password!);
      this.form.reset();
    } else {
      console.error('Form invalid');
    }
  }

}
