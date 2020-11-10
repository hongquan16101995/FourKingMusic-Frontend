import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {


  songList: Song[] = [];

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.songService.getAllSongsNew().subscribe(data => {
      this.songList = data;
    });
  }

}
