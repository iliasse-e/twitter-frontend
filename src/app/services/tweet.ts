import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Tweet } from '../model/tweet.model';
import { Observable } from 'rxjs';

const TWEET_URL = environment.apiUrl + '/tweets';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private http: HttpClient = inject(HttpClient);

  createTweet(content: string): Observable<Response> {
    return this.http.post<Response>(TWEET_URL, { content }, { withCredentials: true });
  }

  getTweet(id: number): Observable<Response> {
    return this.http.get<Response>(`${TWEET_URL}/${id}`, { withCredentials: true });
  }


  deleteTweet(id: number): Observable<void> {
    return this.http.delete<void>(`${TWEET_URL}/${id}`, { withCredentials: true });
  }

  updateTweet(id: number, content: string): Observable<Response> {
    return this.http.put<Response>(`${TWEET_URL}/${id}`, { content }, { withCredentials: true });
  }

  getAllTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(TWEET_URL, { withCredentials: true });
  }
}
