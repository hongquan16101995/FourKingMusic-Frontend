import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../service/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Users} from '../../model/Users';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: number;
  userForm: FormGroup;
  message = '';
  user: Users;
  iduser: number;

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService,
              private route: Router,
              private router: ActivatedRoute,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.userForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        hobbies: ['', [Validators.required]],
        avatarUrl: ['', [Validators.required]]
      });
    this.userForm.patchValue(this.user);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    // this.userForm.value.role = this.user.name;
    // this.userForm.value.email = this.user.email;
    // this.userForm.value.gender = this.user.gender;
    // this.userForm.value.hobbies = this.user.hobbies;
    // this.userForm.value.avatarUrl = this.user.avatarUrl;
    this.userService.updateUser(this.userForm.value).subscribe(() => {
      this.message = 'Update successfully!';
    });
  }

}
