import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {Commentsong} from '../model/Commentsong';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentsongService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getCommentBySong(songid: number): Observable<any>{
    return this.http.get<any>(API_URL + '/commentsong/' + songid, this.httpService.getHttp());
  }

  updateCommentsong(commentsong: Commentsong): Observable<any> {
    return this.http.post(API_URL + '/commentsong', commentsong, this.httpService.getHttp());
  }
}
