import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {Users} from '../../../model/Users';
import {CommentsongService} from '../../../service/commentsong.service';
import {HttpService} from '../../../service/http.service';
import {Commentsong} from '../../../model/Commentsong';
import {UsersService} from '../../../service/users.service';
declare var Amplitude: any;

@Component({
  selector: 'app-user-play-song',
  templateUrl: './user-play-song.component.html',
  styleUrls: ['./user-play-song.component.css']
})
export class UserPlaySongComponent implements OnInit {

  id: number;
  song: Song;
  userId: number;
  user: Users;
  commentSong: Commentsong[];

  constructor(private songService: SongService,
              private usersService: UsersService,
              private commentsongService: CommentsongService,
              private httpService: HttpService,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.usersService.getUserById(this.httpService.getID()).subscribe(res => {
      this.user = res;
    });
    console.log(this.id);
    this.commentsongService.getCommentsongBySong(this.id).subscribe(res => {
      this.commentSong = res;
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
  onEnter(value){
    const cmt = {
      content: value,
      user: this.user,
      song: this.song
    };
    this.commentsongService.updateCommentsong(cmt).subscribe(res => {
      this.commentsongService.getCommentsongBySong(this.song.id).subscribe(data => {
        this.commentSong = data;
      });
    });
  }
}
