import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../environment';
import { User } from '../model/user.model';

const AUTH_URL = environment.apiUrl + '/auth';
const USER_URL = environment.apiUrl + '/users'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _currentUser = signal<User | null>(null);

  currentUser = computed(() => this._currentUser());

  isLoggedIn = computed(() => this._currentUser() !== null);

  signin(email: string, password: string): void {
    fetch(AUTH_URL + '/signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      return response.json();
    })
    .then(data => {
      if (!data.user) {
        throw new Error('No user data returned');
      }
      this._currentUser.set(data?.user);
    })
    .catch(error => {
      console.error('Login failed:', error);
    });
  }

  signout(): void {
    fetch(AUTH_URL + '/signout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to signout');
      }
      this._currentUser.set(null);
    })
    .catch(error => {
      console.error('Signout failed:', error);
    });
  }

  signup(username: string, email: string, password: string): void {
    fetch(USER_URL + '/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({email, username, password})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to signup');
      }
      return response.json();
    })
    .then(data => {
      if (!data) {
        throw new Error('No user data returned');
      }
      this._currentUser.set(data);
    })
    .catch(error => {
      console.error('Signup failed:', error);
    });
  }
}
