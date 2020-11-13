import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commentsong} from '../model/Commentsong';
import {HttpService} from './http.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentsongService {

  constructor(private http: HttpClient,
              private httpService: HttpService) {
  }

  // getAllCommentsong(): Observable<any> {
  //   return  this.http.get<any>(API_URL + '/commentsong');
  // }
  // getCommentsong(id: number): Observable<any> {
  //   return this.http.get<any>(API_URL + '/commentsong/' + id);
  // }
  updateCommentsong(commentsong: Commentsong): Observable<any> {
    return this.http.post(API_URL + '/commentsong', commentsong, this.httpService.getHttp());
  }

  getCommentsongBySong(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/commentsong/' + id, this.httpService.getHttp());
  }

}
