import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProfileComponent } from "../profile/profile.component";
import { AuthenticationService } from '../../services/authentication';
import { TweetComponent } from "../tweet/tweet.component";
import { TweetService } from '../../services/tweet';
import { Tweet } from '../../model/tweet.model';
import { first, take, tap } from 'rxjs';

@Component({
  selector: 'app-tweet-list-component',
  imports: [ProfileComponent, TweetComponent],
  template: `
    <div id="tweet-list-container">

      <profile [profile]="currentUser" />

      <section id="tweets">
        @for (item of tweets(); track $index) {
          <tweet [tweet]="item"></tweet>
        }
      </section>
      @if (errorMessage()) {
        <small>{{errorMessage()}}</small>
      }
    </div>
    `,
  styleUrl: './tweet-list-component.css'
})
export class TweetListComponent {

  #authenticationService = inject(AuthenticationService);

  #tweetService = inject(TweetService);

  currentUser = this.#authenticationService.currentUser();

  tweets: WritableSignal<Tweet[]> = signal([]);

  errorMessage = signal('');

  constructor() {
    this.loadTweets();
  }

  loadTweets(): void {
    this.#tweetService.getAllTweets()
      .pipe(
        take(1),
        tap(data => this.tweets.set(data)),
      )
      .subscribe();
  }

}
