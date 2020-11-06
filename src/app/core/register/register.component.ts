import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {RegisterService} from '../../service/register.service';
import {Users} from '../../model/Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder,
              private registerService: RegisterService,
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
    this.registerService.register(user).subscribe(res => {
      // tslint:disable-next-line:triple-equals
      if (res.message == 'User registered successfully!') {
        this.router.navigate(['login']);
      } else {
        console.log(res);
      }
    });
  }

}
