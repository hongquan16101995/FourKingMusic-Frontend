import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Song} from '../model/Song';
import {HttpService} from './http.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/home/song');
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(API_URL + '/home/song' + id);
  }

  getSongByName(name: string): Observable<Song> {
    return this.http.post<Song>(API_URL + '/home/song/search', name);
  }

  createSong(song: Song): Observable<Song> {
    return this.http.post<Song>(API_URL + '/song', song, this.httpService.getHttp());
  }

  updateSong(song: Song): Observable<Song> {
    return this.http.put<Song>(API_URL + '/song' + song.id, song, this.httpService.getHttp());
  }

  deleteSong(id: number): Observable<any> {
    return this.http.delete(API_URL + '/song' + id, this.httpService.getHttp());
  }
}
