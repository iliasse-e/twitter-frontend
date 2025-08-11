import { inject, Injectable, Resource, resource, signal } from '@angular/core';
import { environment } from '../../environment';
import { User } from '../model/user.model';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const USERS_URL = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class UsersSearchService {

    private http: HttpClient = inject(HttpClient);

    searchTerm = signal('');

    usersList:  Resource<User[] | undefined> = resource({
      params: () => ({search: this.searchTerm()}),
      loader: async ({params: {search}}) => {
        if (search.length) {
          return await firstValueFrom(this.http.get<User[]>(`${USERS_URL}?search=${search}`, { withCredentials: true }))
        }
        else return [];
      }
    }).asReadonly()
}
