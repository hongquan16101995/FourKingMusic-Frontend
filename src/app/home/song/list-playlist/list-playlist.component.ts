import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';
import {Song} from '../../../model/Song';

@Component({
  selector: 'app-list-playlist',
  templateUrl: './list-playlist.component.html',
  styleUrls: ['./list-playlist.component.scss']
})
export class ListPlaylistComponent implements OnInit {

  playlist: Playlist[] = [];

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.playlistService.getAllPlaylists().subscribe(data => {
      this.playlist = data;
    });
  }
}
