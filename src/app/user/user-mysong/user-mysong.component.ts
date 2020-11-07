import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-user-mysong',
  templateUrl: './user-mysong.component.html',
  styleUrls: ['./user-mysong.component.scss']
})
export class UserMysongComponent implements OnInit {

  songList: Song[] = [];

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(data => {
      this.songList = data;
      console.log(data);
    });
  }

}
