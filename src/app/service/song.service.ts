import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Song} from '../model/Song';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SongService {
  token = JSON.parse(localStorage.getItem('token'));
  // tslint:disable-next-line:variable-name
  headers_object = new HttpHeaders().set('Authorization', 'Bearer' + this.token);
  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient) { }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/song');
  }

  getById(id: number): Observable<Song> {
    return this.http.get<Song>(API_URL + '/song' + id);
  }

  createSong(song: Song): Observable<Song> {
    return this.http.post<Song>(API_URL + '/song', song);
  }

  updateSong(song: Song): Observable<Song> {
    return this.http.put<Song>(API_URL + '/song' + song.id, song);
  }

  deleteSong(id: number): Observable<any> {
    return this.http.delete(API_URL + '/song' + id);
  }
}
