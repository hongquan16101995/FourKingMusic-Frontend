import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../service/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Users} from '../../model/Users';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Role} from '../../model/Role';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  message = '';
  user: Users;
  userid: string;
  avaUrl: string;
  selectImg: any = null;
  roles: Role[];

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService,
              private route: Router,
              private router: ActivatedRoute,
              private httpService: HttpService,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        hobbies: ['', [Validators.required]],
        avatarUrl: ['', [Validators.required]]
      });
    this.userid = this.httpService.getID();
    this.userService.getUserById(this.userid).subscribe(data => {
      this.user = data;
      // this.user = {
      //   id: data.id,
      //   roles: data.roles,
      //   username: data.username,
      //   password: data.password
      // };
      this.roles = data.role;
      console.log(this.roles);
      console.log(this.user);
      this.avaUrl = data.avatarUrl;
      this.userForm.patchValue(this.user);
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    const user1 = {
      id: this.user.id,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      username: this.user.username,
      password:  this.user.password,
      gender: this.userForm.value.gender,
      hobbies: this.userForm.value.hobbies,
      avatarUrl: this.avaUrl,
      role: this.user.role
    };
    this.userService.updateUser(user1).subscribe(res => {
      this.message = res.message;
    });
  }

  // tslint:disable-next-line:typedef
  submit(){
    if (this.selectImg !== null){
      const filePath = `avataruser/${this.selectImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.avaUrl = url;
          });
        })
      ).subscribe();
    }
  }
// tslint:disable-next-line:typedef
  showPre(event: any){
    if (event.target.files && event.target.files[0]){
      this.selectImg = event.target.files[0];
      this.submit();
    } else {
      this.avaUrl = '';
      this.selectImg = null;
    }
  }

}
