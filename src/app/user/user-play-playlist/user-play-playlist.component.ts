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
  id: number;
  userId: number;
  p: number;
  playlist: Playlist;

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistById(this.id).subscribe(res => {
      this.songList = res.songs;
    });
    this.userId = Number(this.httpClient.getID());
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
