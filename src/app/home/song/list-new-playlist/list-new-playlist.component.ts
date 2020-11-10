import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';

@Component({
  selector: 'app-list-new-playlist',
  templateUrl: './list-new-playlist.component.html',
  styleUrls: ['./list-new-playlist.component.scss']
})
export class ListNewPlaylistComponent implements OnInit {

  playlists: Playlist[];

  constructor(private playlistService: PlaylistService){
  }

  ngOnInit(): void {
    this.playlistService.getAllPlaylists().subscribe(data => {
      this.playlists = data;
      console.log(data);
    });
  }
}
