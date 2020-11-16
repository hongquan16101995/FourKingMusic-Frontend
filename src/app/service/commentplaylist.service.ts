import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {Commentplaylist} from '../model/Commentplaylist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentplaylistService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getCommentByPlaylist(songid: number): Observable<any>{
    return this.http.get<any>(API_URL + '/home/commentplaylist/' + songid);
  }

  updateCommentplaylist(commentplaylist: Commentplaylist): Observable<any> {
    return this.http.post(API_URL + '/commentplaylist', commentplaylist, this.httpService.getHttp());
  }
}
