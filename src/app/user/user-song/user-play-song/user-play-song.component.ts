import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {Singers} from '../../../model/Singers';
import {UsersService} from '../../../service/users.service';
import {HttpService} from '../../../service/http.service';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';
import {Likesong} from '../../../model/Likesong';
import {LikesongService} from '../../../service/likesong.service';

declare var Amplitude: any;

@Component({
  selector: 'app-user-play-song',
  templateUrl: './user-play-song.component.html',
  styleUrls: ['./user-play-song.component.css']
})
export class UserPlaySongComponent implements OnInit {
  songList: Song[];
  likesongs: Likesong[] = [];
  id: number;
  song: Song;
  playlists: Playlist[];
  userId: number;

  constructor(private userService: UsersService,
              private songService: SongService,
              private likesongService: LikesongService,
              private playlistService: PlaylistService,
              private router: ActivatedRoute,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.userId = Number(this.httpService.getID());
    console.log(this.id);
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistByUser(this.userId).subscribe(res => {
      this.playlists = res;
    });
    this.playlistService.getPlaylistByUser(this.userId).subscribe(playlist => {
      this.playlists = playlist;
    });
    this.likesongService.getAllLikesong().subscribe(response => {
      this.likesongs = response;
      console.log(this.likesongs);
    });
    this.songService.getSongById(this.id).subscribe(res => {
      this.song = res;
      Amplitude.init({
        songs: [
          {
            url: this.song.fileUrl,
            cover_art_url: this.song.avatarUrl
          },
        ],
      });
    });
  }

  // tslint:disable-next-line:typedef
  likesong(song, like) {
    if (like.status) {
      song.countLike--;
      like.status = false;
    } else {
      song.countLike++;
      like.status = true;
    }
    this.likesongService.updateLikesong(like).subscribe(() => {
      this.songService.updateSong(song).subscribe(() => {
        this.songService.getSongById(song.id).subscribe(res => {
          this.song = res;
        });
      });
    });
  }

  // tslint:disable-next-line:typedef
  addSongInPlaylist(listID, songId) {
    this.playlistService.updateSongOfPlaylist(listID, songId).subscribe(res => {
      this.playlistService.getPlaylistByUser(this.userId).subscribe(data => {
        this.playlists = data;
      });
      alert(res.message);
    });
  }
}
