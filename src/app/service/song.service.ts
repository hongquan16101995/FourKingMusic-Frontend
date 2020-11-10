import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
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

  getAllSongsNew(): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/home/song/new');
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(API_URL + '/home/song/' + id);
  }

  getSongByUser(userid: number): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/user/song/' + userid, this.httpService.getHttp());
  }

  getSongByName(name: string): Observable<Song[]> {
    return this.http.post<Song[]>(API_URL + '/home/song/search' , name);
  }

  createSong(song: Song): Observable<any> {
    return this.http.post(API_URL + '/song', song, this.httpService.getHttp());
  }

  updateSong(song: Song): Observable<any> {
    return this.http.put(API_URL + '/song' , song, this.httpService.getHttp());
  }

  deleteSong(id: number, userId: number): Observable<any> {
    // @ts-ignore
    return this.http.delete(API_URL + '/song/' + id, userId, this.httpService.getHttp());
  }
}
