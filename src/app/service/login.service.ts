import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post<any>(API_URL + '/login', data);
  }
}
