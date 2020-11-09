import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';

@Component({
  selector: 'app-new-most-songs',
  templateUrl: './new-most-songs.component.html',
  styleUrls: ['./new-most-songs.component.css']
})
export class NewMostSongsComponent implements OnInit {

  songList: Song[] = [];

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.songService.getAllSongsNew().subscribe(data => {
      this.songList = data;
    });
  }
}
