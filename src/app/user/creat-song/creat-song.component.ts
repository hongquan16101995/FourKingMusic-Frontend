import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongService} from '../../service/song.service';
import {Users} from '../../model/Users';
import {UsersService} from '../../service/users.service';
import {HttpService} from '../../service/http.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-creat-song',
  templateUrl: './creat-song.component.html',
  styleUrls: ['./creat-song.component.css']
})
export class CreatSongComponent implements OnInit {

  songForm: FormGroup;
  message: string;
  user: Users;
  iduser: string;
  avaUrl: string;
  file: string;
  selectImg: any = null;
  selectfile: any = null;

  constructor(private formBuilder: FormBuilder,
              private songService: SongService,
              private userService: UsersService,
              private httpService: HttpService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.songForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        tags: ['', [Validators.required]],
        avatarUrl: ['', [Validators.required]],
        fileUrl: ['', [Validators.required]]
      });
    this.iduser = this.httpService.getID();
    console.log(this.iduser);
    this.userService.getUserById(this.iduser).subscribe(data => {
      this.user = {
        id: data.id
      };
      this.avaUrl = data.avatarUrl;
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    const song = {
      name: this.songForm.value.name,
      description: this.songForm.value.description,
      tags: this.songForm.value.tags,
      avatarUrl: this.avaUrl,
      fileUrl: this.file,
      user: this.user
    };
    this.songService.createSong(song).subscribe(() => {
    });
  }

  // tslint:disable-next-line:typedef
  submit(){
    if (this.selectImg !== null){
      const filePath = `avatarsong/${this.selectImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
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

  // tslint:disable-next-line:typedef
  submitFile(){
    if (this.selectfile !== null){
      const filePath = `file/${this.selectfile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectfile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.file = url;
          });
        })
      ).subscribe();
    }
  }
// tslint:disable-next-line:typedef
  showPreFile(event: any){
    if (event.target.files && event.target.files[0]){
      this.selectfile = event.target.files[0];
      this.submitFile();
    } else {
      this.file = '';
      this.selectfile = null;
    }
  }

}
