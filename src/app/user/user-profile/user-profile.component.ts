import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../service/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Users} from '../../model/Users';
import {Message} from '../../model/message';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: number;
  userForm: FormGroup;
  message: Message;
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

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService,
              private route: Router,
              private router: ActivatedRoute,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    // this.userForm = this.formBuilder.group(
    //   {
    //     name: ['', [Validators.required]],
    //     email: ['', [Validators.required]],
    //     gender: ['', [Validators.required]],
    //     hobbies: ['', [Validators.required]],
    //     avatarUrl: ['', [Validators.required]]
    //   });
    // @ts-ignore
    this.userid = this.httpService.getID();
    this.userService.getById(this.userid).subscribe(data => {
      this.userForm = this.formBuilder.group(
        {
          name: [data.name, [Validators.required]],
          email: [data.email, [Validators.required]],
          gender: [data.gender, [Validators.required]],
          hobbies: [data.hobbies, [Validators.required]],
          avatarUrl: [data.avatarUrl, [Validators.required]]
        });
      this.user.id = data.id;
      this.user.username = data.username;
      this.user.password = data.password;
      this.user.roles = data.roles;
    });
    console.log(this.user);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    // console.log(this.user);
    const user1 = {
      id: this.user.id,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      username: this.user.username,
      password: this.user.password,
      gender: this.userForm.value.gender,
      hobbies: this.userForm.value.hobbies,
      avatarUrl: this.userForm.value.avatarUrl,
      roles: this.user.roles
    };
    this.userService.updateUser(user1).subscribe(data => {
      this.message = {
        message: data
      };
    });
  }

}
