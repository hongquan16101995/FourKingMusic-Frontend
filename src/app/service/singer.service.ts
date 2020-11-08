import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {Singers} from '../model/Singers';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getAllSinger(): Observable<Singers[]> {
    return this.http.get<Singers[]>(API_URL + '/home/singer');
  }
}
