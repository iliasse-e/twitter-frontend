import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TweetService } from '../../services/tweet';

@Component({
  selector: 'app-new-tweet-component',
  imports: [ReactiveFormsModule],
  template:`
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label for="content">Tweet:</label>
      <textarea id="content" formControlName="content" required></textarea>
      @if (form.get('content')?.invalid && form.get('content')?.touched) {
        @if (form.get('content')?.errors?.['required']) {
          <small>Content is required.</small>
        }
        @if (form.get('content')?.errors?.['maxlength']) {
          <small>Content must be at most 140 characters long.</small>
        }
      }
      <button type="submit" [disabled]="form.invalid">Post Tweet</button>
    </form>
  `,
  styleUrl: './new-tweet-component.css'
})
export class NewTweetComponent {

  #tweetService = inject(TweetService);

  form: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(140)]),
  });

  submit(): void {
    if (this.form.valid) {
      this.#tweetService.createTweet(this.form.value.content)
      .then(response => {
        console.log('Tweet created successfully:', response);
      })
      .catch(error => {
        console.error('Error creating tweet:', error);
      });
      this.form.reset();
    } else {
      console.error('Form invalid');
    }
  }
}
