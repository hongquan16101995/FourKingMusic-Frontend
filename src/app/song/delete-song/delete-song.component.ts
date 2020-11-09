import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.css']
})
export class DeleteSongComponent implements OnInit {

  song: Song = {};

  constructor(private songService: SongService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    if (confirm('Are you sure?')) {
      this.songService.getById(id).subscribe(data => {
        this.song = data;
      });
    }
  }

  onDelete(): void {
    this.songService.deleteSong(this.song.id).subscribe(() => {
      alert('Deleted song successfully');
    });
  }
}