import { Component, input, InputSignal } from '@angular/core';
import { User } from '../../model/user.model';

@Component({
  selector: 'user-list',
  imports: [],
  template: `
    <datalist id="users" class="dropdown-list">
      @for (user of users(); track $index) {
        <article class="card">
          <img [src]="user.avatar" alt="">
          <p>{{user.username}}</p>
        </article>
      }
    </datalist>
  `,
  styleUrl: './user-list-component.css'
})
export class UserListComponent {
  users: InputSignal<User[]> = input.required();
}
