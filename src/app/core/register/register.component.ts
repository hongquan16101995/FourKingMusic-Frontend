import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login.service';
import {Message} from '../../model/Message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message: Message;
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      username: [''],
      password: ['']
    });
  }

  // tslint:disable-next-line:typedef
  register(){
    const user = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };
    this.loginService.register(user).subscribe(res => {
      // tslint:disable-next-line:triple-equals
      if (res.message != null) {
        this.router.navigate(['login']);
      } else {
        this.message.message = res.message;
        alert(this.message);
      }
    });
  }

}
