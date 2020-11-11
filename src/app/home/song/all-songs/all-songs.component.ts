import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {LikesongService} from '../../../service/likesong.service';
import {Likesong} from '../../../model/Likesong';
import {HttpService} from '../../../service/http.service';
import {UsersService} from '../../../service/users.service';
import firebase from 'firebase';
import {Users} from '../../../model/Users';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit, Likesong{

  songList: Song[] = [];
  likesongs: Likesong[] = [];
  status: boolean;
  song: Song;
  user: Users;
  userId: number;
  constructor(private songService: SongService,
              private likesongService: LikesongService,
              private userService: UsersService,
              private httpClient: HttpService) {
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
      console.log(this.songList);
      this.userId = Number(this.httpClient.getID());
      this.likesongService.getAllLikesong().subscribe(res => {
        this.likesongs = res;
        console.log(this.likesongs);
      });
      // this.likesongService.getLikesong(this.song.id).subscribe(res => {
      //   this.like = res;
      //   console.log(this.like);
      // });
    });
    console.log(this.userId);
  }

  // tslint:disable-next-line:typedef
  likesong(song, like) {
    if (like.status){
      song.countLike--;
      like.status = false;
    }else {
      song.countLike++;
      like.status = true;
    }
    this.likesongService.updateLikesong(like).subscribe( () => {
      this.songService.updateSong(song).subscribe(() => {
        this.songService.getAllSongs().subscribe(res => {
          this.songList = res;
        });
      });
    });
  }

}
