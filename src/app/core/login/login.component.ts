import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';

declare var FB: any;
declare var Swal: any;

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
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '3471278576296648',
        cookie: true,
        status: true,
        xfbml      : true,
        version    : 'v8.0'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      // tslint:disable-next-line:prefer-const
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));

  }

  // tslint:disable-next-line:typedef
  loginFacebook() {
    FB.login((response) => {
      //do something
      console.log(response);

      if (response != null && response.status === 'connected') {
        sessionStorage.setItem('token', JSON.stringify(response.authResponse.accessToken));
        FB.api(
          "/" + response.authResponse.userID,
          'GET',
          {"fields":"picture, email"},
          (res) => {
            console.log(res);
            sessionStorage.setItem('userId', JSON.stringify(res.id));
            this.router.navigate(['home']);
            if (res && !res.error) {
              / handle the result /
            }
            console.log(res.id);
            // console.log(res.picture.metadata.url);
          }
        );
      }
    }, { scope: 'email' });
  }

  // tslint:disable-next-line:typedef
  login() {
    const data = this.loginForm.value;
    this.loginService.login(data).subscribe(res => {
      // tslint:disable-next-line:triple-equals
      if (res.id != null) {
        const jwt = res.token;
        sessionStorage.setItem('token', JSON.stringify(jwt));
        sessionStorage.setItem('userId', JSON.stringify(res.id));
        this.router.navigate(['home']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Đăng nhập thất bại!',
          footer: '<a [routerLink]="[/register]" ]>Nếu bạn chưa tạo tài khoản? Click me!</a>'
        });
      }
    });
  }
}
