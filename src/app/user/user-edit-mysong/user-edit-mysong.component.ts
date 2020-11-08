import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';
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
  file: string;
  selectImg: any = null;
  selectfile: any = null;

  constructor(private formBuilder: FormBuilder,
              private songService: SongService,
              private router: ActivatedRoute,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.songForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        tags: ['']
      });
    this.songService.getSongById(this.id).subscribe(data => {
      this.song = {
        id: data.id,
        user: data.user,
        singers: data.singers,
        dateCreated: data.dateCreated
      };
      this.avaUrl = data.avatarUrl;
      this.songForm.patchValue(data);
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
      fileUrl: this.songForm.value.fileUrl,
      user: this.song.user,
      singers: this.song.singers,
      dateCreated: this.song.dateCreated
    };
    console.log(song1.id);
    this.songService.updateSong(song1).subscribe(() => {
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
