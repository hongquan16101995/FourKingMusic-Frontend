import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';
import {Users} from '../../model/Users';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
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
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  // tslint:disable-next-line:typedef
  login() {
    const data = this.loginForm.value;
    this.loginService.login(data).subscribe(res => {
      this.user = res.user;
      console.log(res.user);
      console.log(this.user);
      // tslint:disable-next-line:triple-equals
      if (res.id != null) {
        const jwt = res.token;
        localStorage.setItem('token', JSON.stringify(jwt));
        localStorage.setItem('userId', JSON.stringify(res.id));
        this.router.navigate(['userHome']);
      } else {
        console.log(res);
      }
    });
  }
}
