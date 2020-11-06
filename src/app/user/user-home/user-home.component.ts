import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  logout(){
    localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.removeItem('user');
    localStorage.clear();
    this.route.navigate(['']);
  }

}
