import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.clear();
    this.route.navigate(['']);
  }

}
