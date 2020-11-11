import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {LikesongService} from '../../../service/likesong.service';
import {Likesong} from '../../../model/Likesong';
import {HttpService} from '../../../service/http.service';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';
import {UsersService} from '../../../service/users.service';
import {Users} from '../../../model/Users';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit {

  songList: Song[];
  playlists: Playlist[];
  like: Likesong;
  userId: number;
  countLike: number;
  status: boolean;
  a: number;

  constructor(private songService: SongService,
              private playlistService: PlaylistService,
              private likesongService: LikesongService,
              private userService: UsersService,
              private httpClient: HttpService) {
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
      for (const s of this.songList){
        this.likesongService.getLikesongByUserAndSong(this.userId, s.id).subscribe(data => {
          this.status = data;
        });
      }
    });
    this.userId = Number(this.httpClient.getID());
    this.playlistService.getPlaylistByUser(this.userId).subscribe( res => {
      this.playlists = res;
    });
  }

  // tslint:disable-next-line:typedef
  likesong(data) {
    this.likesongService.getLikesongByUserAndSong(this.userId, data).subscribe(res => {
      this.like = res;
      this.status = this.like.status;
    });
  }

  // tslint:disable-next-line:typedef
  addSongInPlaylist(listID, songId){
    this.playlistService.updateSongOfPlaylist(listID, songId).subscribe( res => {
      this.playlistService.getPlaylistByUser(this.userId).subscribe( res => {
        this.playlists = res;
      });
      alert(res.message);
    });
  }
}
