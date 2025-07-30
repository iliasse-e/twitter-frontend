import { Injectable, Resource, resource, signal } from '@angular/core';
import { environment } from '../../environment';
import { User } from '../model/user.model';

const USERS_URL = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class UsersSearch {
    searchTerm = signal('');

    usersList:  Resource<User[]> = resource({
      params: () => ({search: this.searchTerm()}),
      loader: async ({params: {search}, abortSignal}) => {
        if (search.length) {
          return (await fetch(
            `${USERS_URL}?search=${search}`,
            { signal: abortSignal, credentials: 'include' }
          )).json();
        }
        else return [];
      }
    }).asReadonly()
}
