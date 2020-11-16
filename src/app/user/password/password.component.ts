import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../service/users.service';
declare var Swal: any;
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  passwordForm: FormGroup;
  mess: string;

  constructor(private fb: FormBuilder,
              private userService: UsersService) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required]],
      renewpassword: ['', [Validators.required]]
    });
  }

  // tslint:disable-next-line:typedef
  changePassword(){
    const data = {
      password: this.passwordForm.value.oldpassword,
      newpassword: this.passwordForm.value.newpassword
    };
    this.userService.changePassword(data).subscribe(res => {
      Swal.fire({
        title: res.message,
        showConfirmButton: true,
        timer: 3000
      });
    });
  }
}
