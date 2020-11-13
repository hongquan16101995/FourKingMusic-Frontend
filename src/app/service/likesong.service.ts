import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Likesong} from '../model/Likesong';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikesongService {

  constructor(private http: HttpClient) { }

  getAllLikesong(): Observable<any> {
    return this.http.get<any>(API_URL + '/likesong');
  }

  updateLikesong(likesong: Likesong): Observable<any> {
    return this.http.post(API_URL + '/likesong', likesong);
  }
}
