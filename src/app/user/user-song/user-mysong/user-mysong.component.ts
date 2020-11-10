import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {HttpService} from '../../../service/http.service';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';

@Component({
  selector: 'app-user-mysong',
  templateUrl: './user-mysong.component.html',
  styleUrls: ['./user-mysong.component.scss']
})
export class UserMysongComponent implements OnInit {

  songList: Song[] = [];
  playlists: Playlist[] = [];
  userid: number;

  constructor(private songService: SongService,
              private httpService: HttpService,
              private playlistService: PlaylistService) {
  }

  ngOnInit(): void {
    this.userid = Number(this.httpService.getID());
    this.songService.getSongByUser(this.userid).subscribe(data => {
      this.songList = data;
    });

    this.userid = Number(this.httpService.getID());
    this.playlistService.getPlaylistByUser(this.userid).subscribe(data => {
      this.playlists = data;
    });
  }
}
