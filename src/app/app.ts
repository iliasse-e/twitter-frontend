import { Component, effect, inject, signal } from '@angular/core';
import { AuthenticationService } from './services/authentication';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';
import { UsersSearch } from './services/users-search';
import { UserListComponent } from './component/user-list-component/user-list-component';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, UserListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('twitter');

  #authenticationService = inject(AuthenticationService)

  #userService = inject(UsersSearch);

  currentUser = this.#authenticationService.currentUser;

  userList = this.#userService.usersList;

  userSearch: FormControl = new FormControl('', [Validators.minLength(3)]);


  constructor() {

    effect(() =>{
      console.log(this.userList.value());

    })


    this.userSearch.valueChanges
    .pipe(
      debounceTime(800),
      filter((data: string) => data.length > 2),
      distinctUntilChanged(),
      tap(data => this.#userService.searchTerm.set(data))
    )
    .subscribe();
  }

  logout(): void {
    this.#authenticationService.signout();
  }

  login(email: string, password: string): void {
    this.#authenticationService.signin(email, password);
  }




}
