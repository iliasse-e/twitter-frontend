import { Component, input } from '@angular/core';
import { User } from '../../model/user.model';

@Component({
  selector: 'profile',
  imports: [],
  template: `
    <div id="profile-card" class="card">
      <img src="avatar.png" alt="Profile">
      <h2 class="card-title">User Profile</h2>
      <p>Username: {{ profile()?.username }}</p>
    </div>

  `,
  styleUrl: './profile.css'
})
export class ProfileComponent {
  profile = input.required<User | null>();
}
