import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Likesong} from '../model/Likesong';
import {Users} from '../model/Users';
import {Song} from '../model/Song';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikesongService {

  constructor(private http: HttpClient) { }

  getAllLikesong(): Observable<any> {
    return this.http.get<any>(API_URL + '/likesong');
  }

  getLikesong(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/likesong/' + id);
  }

  updateLikesong(likesong: Likesong): Observable<any> {
    return this.http.post<any>(API_URL + '/likesong', likesong);
  }


  getLikesongByUserAndSong(user: Users, song: Song): Observable<any>{
    return this.http.post(API_URL + '/likesong', user.id);
  }
}