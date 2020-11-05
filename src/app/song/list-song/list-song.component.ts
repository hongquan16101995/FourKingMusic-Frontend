import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.sass']
})
export class ListSongComponent implements OnInit {

  songList: Song[] = [];
  song0: Song;
  song1: Song;
  song2: Song;
  song3: Song;
  song4: Song;
  song5: Song;
  song6: Song;
  song7: Song;
  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(data => {
      this.songList = data;
      for (const i = 0; i < this.songList.length; ) {
        this.song0 = this.songList[0];
        this.song1 = this.songList[i];
        this.song2 = this.songList[i + 1];
        this.song3 = this.songList[i + 2];
        this.song4 = this.songList[i + 3];
        this.song5 = this.songList[i + 4];
        this.song6 = this.songList[i + 5];
        this.song7 = this.songList[i + 6];
        break;
      }
      console.log(data);
    });
  }

}
