import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Users} from '../model/Users';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {Password} from '../model/Password';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  changeInfo(user: Users): Observable<any> {
    return this.http.post<any>(API_URL + '/user/changeinfo', user, this.httpService.getHttp());
  }

  // tslint:disable-next-line:typedef
  changePassword(data: Password): Observable<any> {
    return this.http.post<any>(API_URL + '/user/changepassword', data, this.httpService.getHttp());
  }

  getAllUser(): Observable<Users[]> {
    return this.http.get<Users[]>(API_URL);
  }

  getById(id: string): Observable<Users> {
    return this.http.get<Users>(API_URL + '/user/' + id, this.httpService.getHttp());
  }

  creatUser(user: Users): Observable<Users> {
    return this.http.post<Users>(API_URL, user);
  }

  updateUser(user: Users): Observable<any> {
    return this.http.post<Users>(API_URL + '/user/changeinfo', user , this.httpService.getHttp());
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(API_URL + id);
  }
}
