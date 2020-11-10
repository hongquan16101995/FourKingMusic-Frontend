import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.sass']
})
export class ListSongComponent implements OnInit {

  songList: Song[] = [];
  song1: Song = null;
  song2: Song = null;
  song3: Song = null;
  song4: Song = null;
  song5: Song = null;
  song6: Song = null;
  song7: Song = null;
  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getAllSongsNew().subscribe(data => {
      this.songList = data;
      for (const i = 0; i < this.songList.length; ) {
        this.song1 = this.songList[i];
        this.song2 = this.songList[i + 1];
        this.song3 = this.songList[i + 2];
        this.song4 = this.songList[i + 3];
        this.song5 = this.songList[i + 4];
        this.song6 = this.songList[i + 5];
        this.song7 = this.songList[i + 6];
        break;
      }
    });
  }

}
