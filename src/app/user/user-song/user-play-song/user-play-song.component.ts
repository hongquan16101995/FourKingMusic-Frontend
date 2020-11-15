import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../../service/users.service';
import {HttpService} from '../../../service/http.service';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';
import {Likesong} from '../../../model/Likesong';
import {LikesongService} from '../../../service/likesong.service';
import {CommentsongService} from '../../../service/commentsong.service';
import {Commentsong} from '../../../model/Commentsong';
import {Users} from '../../../model/Users';
import {FormBuilder, FormGroup} from '@angular/forms';

declare var Amplitude: any;
declare var Swal: any;

@Component({
  selector: 'app-user-play-song',
  templateUrl: './user-play-song.component.html',
  styleUrls: ['./user-play-song.component.css']
})
export class UserPlaySongComponent implements OnInit {
  songList: Song[];
  likesongs: Likesong[];
  playlists: Playlist[];
  commentsong: Commentsong[];
  id: number;
  song: Song;
  userId: number;
  user: Users;
  form: FormGroup;
  p: number;

  constructor(private userService: UsersService,
              private songService: SongService,
              private likesongService: LikesongService,
              private commentsongService: CommentsongService,
              private playlistService: PlaylistService,
              private router: ActivatedRoute,
              private httpService: HttpService,
              private formbuild: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formbuild.group({
      comment: ['']
    });
    this.userId = Number(this.httpService.getID());
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistByUser(this.userId).subscribe(res => {
      this.playlists = res;
    });
    this.commentsongService.getCommentBySong(this.id).subscribe(res => {
      this.commentsong = res;
    });
    this.likesongService.getAllLikesong().subscribe(res => {
      this.likesongs = res;
    });
    this.userService.getUserById(this.httpService.getID()).subscribe(res => {
      this.user = res;
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
  onEnter() {
    const cmt = {
      content: this.form.value.comment,
      user: this.user,
      song: this.song
    };
    this.commentsongService.updateCommentsong(cmt).subscribe(res => {
      this.commentsongService.getCommentBySong(this.song.id).subscribe( data => {
        this.commentsong = data;
        this.form.reset();
      });
    });
  }

  // tslint:disable-next-line:typedef

  addSongInPlaylist(listID, songId) {
    this.playlistService.updateSongOfPlaylist(listID, songId).subscribe(res => {
      this.playlistService.getPlaylistByUser(this.userId).subscribe(data => {
        this.playlists = data;
      });
      Swal.fire({
        icon: 'success',
        title: res.message,
        showConfirmButton: true,
        timer: 3000
      });
    });
  }
}
