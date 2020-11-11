import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../../model/Playlist';
import {PlaylistService} from '../../../service/playlist.service';

@Component({
  selector: 'app-all-playlist',
  templateUrl: './all-playlist.component.html',
  styleUrls: ['./all-playlist.component.css']
})
export class AllPlaylistComponent implements OnInit {
p = 1;
  playlists: Playlist[] = [];

  constructor( private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.playlistService.getAllPlaylists().subscribe(res => {
      this.playlists = res;
    });
  }

}
