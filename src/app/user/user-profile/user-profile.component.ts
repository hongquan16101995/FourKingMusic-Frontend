import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../service/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Users} from '../../model/Users';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

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
  iduser: string;
  avaUrl: string;
  selectImg: any = null;

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService,
              private route: Router,
              private router: ActivatedRoute,
              private httpService: HttpService,
              private storage: AngularFireStorage) {
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
    // @ts-ignore
    this.iduser = this.httpService.getID();
    console.log(this.iduser);
    this.userService.getUserById(this.iduser).subscribe(data => {
      this.user = {
        id: data.id,
        role: data.role,
        username: data.username,
        password: data.password
      };
      this.avaUrl = data.avatarUrl;
      this.userForm.patchValue(data);
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
      password:  this.user.password,
      gender: this.userForm.value.gender,
      hobbies: this.userForm.value.hobbies,
      avatarUrl: this.avaUrl,
      role: this.user.role
    };
    this.userService.updateUser(user1).subscribe(data => {
      console.log(user1);
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
