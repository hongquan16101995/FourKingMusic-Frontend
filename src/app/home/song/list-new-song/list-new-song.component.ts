import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';

@Component({
  selector: 'app-list-new-song',
  templateUrl: './list-new-song.component.html',
  styleUrls: ['./list-new-song.component.scss']
})
export class ListNewSongComponent implements OnInit {

  songList: Song[] = [];
  constructor(private songService: SongService) { }
  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(data => {
      this.songList = data;
      console.log(data);
    });
  }


}
