import { Routes } from '@angular/router';
import { SignupComponent } from './component/signup-component/signup-component';
import { SigninComponent } from './component/signin-component/signin-component';
import { ProfileComponent } from './component/profile/profile.component';
import { TweetListComponent } from './component/tweet-list-component/tweet-list-component';
import { NewTweetComponent } from './component/new-tweet-component/new-tweet-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tweets',
    pathMatch: 'full',
  },
  {
    path: 'tweets',
    component: TweetListComponent
  },
  {
    path: 'tweets/new',
    component: NewTweetComponent
  },
  {
    path: 'sign-in',
    component: SigninComponent
  },
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'user/:id',
    component: ProfileComponent
  }
];
