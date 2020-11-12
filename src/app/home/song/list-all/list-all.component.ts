import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {Playlist} from '../../../model/Playlist';
import {PlaylistService} from '../../../service/playlist.service';
import {HttpService} from '../../../service/http.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {


  songList: Song[] = [];
  playlists: Playlist[] = [];

  constructor(private songService: SongService,
              private playlistService: PlaylistService) {
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
    });
    this.playlistService.getAllPlaylists().subscribe(res => {
      this.playlists = res;
    });
  }
}
