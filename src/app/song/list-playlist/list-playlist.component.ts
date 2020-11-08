import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-list-playlist',
  templateUrl: './list-playlist.component.html',
  styleUrls: ['./list-playlist.component.scss']
})
export class ListPlaylistComponent implements OnInit {

  songList: Song[] = [];
  constructor(private songService: SongService) { }
  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(data => {
      this.songList = data;
      console.log(data);
    });
  }
}
