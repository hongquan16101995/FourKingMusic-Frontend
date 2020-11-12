import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../service/playlist.service';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Song} from '../../model/Song';
import {Playlist} from '../../model/Playlist';

@Component({
  selector: 'app-user-playlist',
  templateUrl: './user-playlist.component.html',
  styleUrls: ['./user-playlist.component.css']
})
export class UserPlaylistComponent implements OnInit {


  constructor(private playlistService: PlaylistService,
              private router: ActivatedRoute,
              private httpClient: HttpService) { }

  songList: Song[];
  id: number;
  userId: number;
  p: number;
  playlist: Playlist;

  ngOnInit(): void {
    this.userId = Number(this.httpClient.getID());
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistById(this.id).subscribe(res => {
      this.playlist = res;
      this.songList = res.songs;
    });
  }

  // tslint:disable-next-line:typedef
  onDeleteSongWithoutPlaylist(id){
    this.playlistService.deleteSongOfPlaylist(this.id, id).subscribe(res => {
      this.playlistService.getPlaylistById(this.id).subscribe(data => {
        this.songList = data.songs;
      });
      alert(res.message);
    });
  }
}
