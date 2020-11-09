import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Users} from '../../model/Users';
import {HttpService} from '../../service/http.service';
import {UsersService} from '../../service/users.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  user: Users = {
    id: 0,
    name: '',
    email: '',
    username: '',
    password: '',
    gender: '',
    hobbies: '',
    avatarUrl: '',
    roles: [
      {
        id: 0,
      }
    ]
  };
  userid: string;

  constructor(private route: Router,
              private httpService: HttpService,
              private userService: UsersService) { }

  ngOnInit(): void {
    this.userid = this.httpService.getID();
    this.userService.getById(this.userid).subscribe(data => {

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
