import { Component, input } from '@angular/core';
import { Tweet } from '../../model/tweet.model';

@Component({
  selector: 'tweet',
  imports: [],
  template: `
    <article class="tweet card">
      <div class="avatar-container">
        <img src="avatar.png" alt="Avatar">
        <small>{{ tweet()?.author?.username }}</small>
      </div>
       <div class="content">
         <p>{{ tweet()?.content }}</p>
       </div>
       <button>Unfollow</button>
    </article>
  `,
  styleUrl: './tweet.css'
})
export class TweetComponent {
  tweet = input<Tweet>();
}
