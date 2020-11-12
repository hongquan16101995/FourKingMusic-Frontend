import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Users} from '../../model/Users';
import {UsersService} from '../../service/users.service';
import {HttpService} from '../../service/http.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  user: Users;
  userid: string;

  constructor(private route: Router,
              private userService: UsersService,
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.userid = this.httpService.getID();
    this.userService.getUserById(this.userid).subscribe(res => {
      this.user = res;
    });
  }

  // tslint:disable-next-line:typedef
  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.clear();
    this.route.navigate(['']);
  }

}
