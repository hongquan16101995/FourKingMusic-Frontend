import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Singers} from '../model/Singers';
import {Song} from '../model/Song';
import {Playlist} from '../model/Playlist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getAllSingers(): Observable<Singers[]> {
    return this.http.get<Singers[]>(API_URL + '/home/singer');
  }

  getSingerById(id: number): Observable<Singers> {
    return this.http.get<Singers>(API_URL + '/home/singer/' + id);
  }

  getSingerByName(name: string): Observable<Singers[]> {
    return this.http.post<Singers[]>(API_URL + '/home/singer/search', name);
  }

  createSinger(singer: Singers): Observable<Playlist> {
    return this.http.post(API_URL + '/singer', singer, this.httpService.getHttp());
  }
}
