import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongService} from '../../../service/song.service';
import {Users} from '../../../model/Users';
import {UsersService} from '../../../service/users.service';
import {HttpService} from '../../../service/http.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
declare var Swal: any;

@Component({
  selector: 'app-creat-song',
  templateUrl: './creat-song.component.html',
  styleUrls: ['./creat-song.component.css']
})
export class CreatSongComponent implements OnInit {

  songForm: FormGroup;
  message: string;
  user: Users;
  userid: string;
  avaUrl: string;
  fileUrl: string;
  selectImg: any = null;
  selectFile: any = null;

  constructor(private formBuilder: FormBuilder,
              private songService: SongService,
              private userService: UsersService,
              private httpService: HttpService,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.songForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: [''],
        tags: [''],
        avatarUrl: ['', [Validators.required]],
        fileUrl: ['', [Validators.required]]
      });
    this.userid = this.httpService.getID();
    this.userService.getUserById(this.userid).subscribe(res => {
      this.user = res;
      this.avaUrl = res.avatarUrl;
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    const song = {
      name: this.songForm.value.name,
      description: this.songForm.value.description,
      tags: this.songForm.value.tags,
      avatarUrl: this.avaUrl,
      fileUrl: this.fileUrl,
      user: this.user
    };
    this.songService.createSong(song).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 3000
      });
      this.songForm.reset();
    });
  }

  // tslint:disable-next-line:typedef
  submitAvatar() {
    if (this.selectImg !== null) {
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
  showPreAvtar(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectImg = event.target.files[0];
      this.submitAvatar();
    } else {
      this.selectImg = null;
    }
  }

  // tslint:disable-next-line:typedef
  submitFile() {
    if (this.selectFile !== null) {
      const filePath = `file/${this.selectFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.fileUrl = url;
          });
        })
      ).subscribe();
    }
  }

  // tslint:disable-next-line:typedef
  showPreFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectFile = event.target.files[0];
      this.submitFile();
    } else {
      this.fileUrl = '';
      this.selectFile = null;
    }
  }
}
