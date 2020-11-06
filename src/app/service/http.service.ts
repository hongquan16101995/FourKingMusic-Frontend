import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  token = JSON.parse(localStorage.getItem('token'));
  // tslint:disable-next-line:variable-name
  headers_object = new HttpHeaders().set('Authorization', 'Bearer' + this.token);
  httpOptions = {
    headers: this.headers_object
  };

  constructor() { }

  // tslint:disable-next-line:contextual-lifecycle use-lifecycle-interface
  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  getHttp(){
    return this.httpOptions;
  }
}
