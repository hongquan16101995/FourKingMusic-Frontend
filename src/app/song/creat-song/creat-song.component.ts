import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-creat-song',
  templateUrl: './creat-song.component.html',
  styleUrls: ['./creat-song.component.css']
})
export class CreatSongComponent implements OnInit {

  songForm: FormGroup;
  message: string;
  song: Song = {
    id: 0,
    name: '',
    description: '',
    tags: '',
    avatarUrl: '',
    fileUrl: ''
  };

  constructor(private formBuilder: FormBuilder,
              private songService: SongService) { }

  ngOnInit(): void {
    this.songForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        tags: ['', [Validators.required]],
        avatarUrl: ['', [Validators.required]],
        fileUrl: ['', [Validators.required]]
      });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.song = this.songForm.value;
    this.songService.createSong(this.song).subscribe(() => {
      this.message = 'Add successfully';
    });
  }

}
