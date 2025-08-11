import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environment';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs';

const AUTH_URL = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private http: HttpClient = inject(HttpClient);

  private _currentUser = signal<User | null>(null);

  currentUser = computed(() => this._currentUser());
  isLoggedIn = computed(() => this._currentUser() !== null);

  signin(email: string, password: string): void {
    this.http.post<{ user: User }>(`${AUTH_URL}/signin`, { email, password }, { withCredentials: true })
      .pipe(
        tap((data) => {
          if (!data.user) throw new Error('No user data returned');
          this._currentUser.set(data.user);
        }),
        take(1),
      )
      .subscribe();
  }

  signout(): void {
    this.http.post(`${AUTH_URL}/signout`, {}, { withCredentials: true })
      .pipe(
        tap(() => this._currentUser.set(null)),
        take(1)
      )
      .subscribe();
  }

  signup(username: string, email: string, password: string): void {
    this.http.post<User>(`${AUTH_URL}/signup`, { email, username, password }, { withCredentials: true })
      .pipe(
        tap((data) => {
          if (!data) throw new Error('No user data returned');
          this._currentUser.set(data);
        }),
        take(1)
      )
      .subscribe();
  }

}
