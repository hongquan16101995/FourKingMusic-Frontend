import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {HttpService} from '../../../service/http.service';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';
import {UsersService} from '../../../service/users.service';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit {

  songList: Song[];
  playlists: Playlist[];
  userId: number;
  countLike: number;
  status: boolean;
  p: number;

  constructor(private songService: SongService,
              private playlistService: PlaylistService,
              private userService: UsersService,
              private httpClient: HttpService) {
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
    });
    this.userId = Number(this.httpClient.getID());
    this.playlistService.getPlaylistByUser(this.userId).subscribe(res => {
      this.playlists = res;
    });
  }

  // tslint:disable-next-line:typedef
  addSongInPlaylist(listID, songId) {
    this.playlistService.updateSongOfPlaylist(listID, songId).subscribe(res => {
      this.playlistService.getPlaylistByUser(this.userId).subscribe(data => {
        this.playlists = res;
      });
      alert(res.message);
    });
  }
}
