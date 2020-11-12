import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {PlaylistService} from '../../service/playlist.service';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Playlist} from '../../model/Playlist';

@Component({
  selector: 'app-user-play-playlist',
  templateUrl: './user-play-playlist.component.html',
  styleUrls: ['./user-play-playlist.component.css']
})
export class UserPlayPlaylistComponent implements OnInit {

  constructor(private playlistService: PlaylistService,
              private router: ActivatedRoute,
              private httpClient: HttpService) { }

  songList: Song[];
  playlistid: number;
  userId: number;
  p: number;
  playlist: Playlist;

  ngOnInit(): void {
    this.userId = Number(this.httpClient.getID());
    this.playlistid = Number(this.router.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistById(this.playlistid).subscribe(res => {
      this.playlist = res;
      this.songList = res.songs;
    });
  }

  // tslint:disable-next-line:typedef
  onDeleteSongWithoutPlaylist(id){
    this.playlistService.deleteSongOfPlaylist(this.playlistid, id).subscribe(res => {
      this.playlistService.getPlaylistById(this.playlistid).subscribe(data => {
        this.songList = data.songs;
      });
      alert(res.message);
    });
  }
}
