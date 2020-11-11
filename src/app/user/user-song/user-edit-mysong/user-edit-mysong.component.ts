import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-user-edit-mysong',
  templateUrl: './user-edit-mysong.component.html',
  styleUrls: ['./user-edit-mysong.component.css']
})
export class UserEditMysongComponent implements OnInit {

  id: number;
  songForm: FormGroup;
  message = '';
  song: Song;
  avaUrl: string;
  fileUrl: string;
  selectImg: any = null;
  selectFile: any = null;

  constructor(private formBuilder: FormBuilder,
              private songService: SongService,
              private router: ActivatedRoute,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.songForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: [''],
        tags: ['']
      });
    this.songService.getSongById(this.id).subscribe(res => {
      this.song = res;
      this.avaUrl = res.avatarUrl;
      this.fileUrl = res.fileUrl;
      this.songForm.patchValue(res);
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    const song1 = {
      id: this.song.id,
      name: this.songForm.value.name,
      description: this.songForm.value.description,
      tags: this.songForm.value.tags,
      avatarUrl: this.avaUrl,
      fileUrl: this.fileUrl,
      user: this.song.user,
      dateCreated: this.song.dateCreated
    };
    this.songService.updateSong(song1).subscribe(res => {
      alert(res.message);
    });
  }

  // tslint:disable-next-line:typedef
  submitAvatar(){
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
      this.submitAvatar();
    } else {
      this.avaUrl = this.song.avatarUrl;
      this.selectImg = null;
    }
  }

  // tslint:disable-next-line:typedef
  submitFile(){
    if (this.selectFile !== null){
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
  showPreFile(event: any){
    if (event.target.files && event.target.files[0]){
      this.selectFile = event.target.files[0];
      this.submitFile();
    } else {
      this.fileUrl = this.song.fileUrl;
      this.selectFile = null;
    }
  }
}
