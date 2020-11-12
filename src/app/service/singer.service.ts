import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Singers} from '../model/Singers';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http: HttpClient) { }

  getAllSinger(): Observable<Singers[]> {
    return this.http.get<Singers[]>(API_URL + '/home/singer');
  }

  getSingerById(singerId: number): Observable<Singers> {
    return this.http.get<Singers>(API_URL + '/home/' + singerId);
  }
}
