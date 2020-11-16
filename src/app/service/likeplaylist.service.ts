import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpService} from './http.service';
import {Likeplaylist} from '../model/Likeplaylist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikeplaylistService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getAllLikeplaylist(): Observable<any> {
    return this.http.get<any>(API_URL + '/likeplaylist', this.httpService.getHttp());
  }

  updateLikeplaylist(likeplaylist: Likeplaylist): Observable<any> {
    return this.http.post(API_URL + '/likeplaylist', likeplaylist, this.httpService.getHttp());
  }
}
