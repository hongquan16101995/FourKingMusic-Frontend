import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Users} from '../model/Users';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user: Users): Observable<any>{
    return this.http.post<any>(API_URL + '/api/auth/signup', user);
  }
}
