import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.scss']
})
export class SingerComponent implements OnInit {

  songList: Song[] = [];
  constructor(private songService: SongService) { }
  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(data => {
      this.songList = data;
      console.log(data);
    });
  }
}
