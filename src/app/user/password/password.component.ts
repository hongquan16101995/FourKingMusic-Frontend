import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../service/users.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  passwordForm: FormGroup;
  constructor(private fb: FormBuilder,
              private userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldpassword: [''],
      newpassword: [''],
      renewpassword: ['']
    });
  }

  // tslint:disable-next-line:typedef
  changePassword(){
    const data = {
      password: this.passwordForm.value.oldpassword,
      newpassword: this.passwordForm.value.newpassword
    };
    this.userService.changePassword(data)
      .subscribe(res => {
      // tslint:disable-next-line:triple-equals
      if (res.message != null) {
        console.log(res.message);
      } else {
        console.log(res.message);
      }
    });
  }
}
