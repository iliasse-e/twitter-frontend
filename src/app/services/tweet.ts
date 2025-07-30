import { Injectable, signal } from '@angular/core';
import { environment } from '../../environment';
import { Tweet } from '../model/tweet.model';

const TWEET_URL = environment.apiUrl + '/tweets';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  createTweet(content: string): Promise<Response> {
    return fetch(TWEET_URL, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ content }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create tweet');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error creating tweet:', error);
    });
  }

  getTweet(id: number): Promise<Response> {
    return fetch(`${TWEET_URL}/${id}`, {credentials: 'include'})
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tweet');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching tweet:', error);
      });
  }

  deleteTweet(id: number): Promise<Response> {
    return fetch(`${TWEET_URL}/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete tweet');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error deleting tweet:', error);
    });
  }

  updateTweet(id: number, content: string): Promise<Response> {
    return fetch(`${TWEET_URL}/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ content }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update tweet');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error updating tweet:', error);
    });
  }

  getAllTweets(): Promise<Tweet[]> {
    return fetch(TWEET_URL, {method: 'GET', headers: {"Content-Type": "application/json"}, credentials: 'include'})
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tweets');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching tweets:', error);
      });
  }

}
