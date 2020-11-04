import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';
import {Singer} from '../../model/Singer';
import {Data} from '../../model/data';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.css']
})
export class ListSongComponent implements OnInit {

  data1: Data;
  songList: Song[] = [];
  song: Song;

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(data => {
      this.songList = data;
      for (const s of this.songList){
        this.data1.singers = s.singer;
      }
      console.log(data);
    });
  }

}
