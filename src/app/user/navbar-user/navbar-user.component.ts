import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Users} from '../../model/Users';
import {UsersService} from '../../service/users.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {
  user: Users;
  userid: string;
  avaUrl: string;
  constructor(private route: Router,
              private userService: UsersService,) { }

  ngOnInit(): void {
    this.userService.getUserById(this.userid).subscribe(res => {
      this.user = res;
      this.avaUrl = res.avatarUrl;
    });
  }

  // tslint:disable-next-line:typedef
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.clear();
    this.route.navigate(['']);
  }

}
