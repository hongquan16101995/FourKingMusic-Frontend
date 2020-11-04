import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Song} from '../../model/Song';
import {ActivatedRoute, Router} from '@angular/router';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-creat-song',
  templateUrl: './creat-song.component.html',
  styleUrls: ['./creat-song.component.css']
})
export class CreatSongComponent implements OnInit {

  id: number;
  songForm: FormGroup;
  message = '';
  song: Song;

  constructor(private formBuilder: FormBuilder,
              private songService: SongService,
              private route: Router,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.songForm = this.formBuilder.group(
      {
        title: ['', [Validators.required]],
        author: ['', [Validators.required]],
        description: ['', [Validators.required]]
      });
    this.songService.getById(this.id).subscribe(book => {
      this.song = book;
      this.songForm.patchValue(this.song);
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.songForm.value.id = this.song.id;
    this.songForm.value.role = this.song.name;
    this.songForm.value.password = this.song.description;
    this.songForm.value.password = this.song.tags;
    this.songForm.value.password = this.song.avatarUrl;
    this.songForm.value.password = this.song.fileUrl;
    this.songForm.value.password = this.song.dateCreated;
    this.songService.updateSong(this.songForm.value).subscribe(() => {
      this.message = 'Update successfully!';
      this.song = this.songForm.value;
    });
  }

}
