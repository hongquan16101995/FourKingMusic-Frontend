import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
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
      // tslint:disable-next-line:triple-equals
      if (res.email != null) {
        const jwt = res.token;
        localStorage.setItem('token', JSON.stringify(jwt));
        this.router.navigate(['']);
      } else {
        console.log(res);
      }
    });
  }
}
