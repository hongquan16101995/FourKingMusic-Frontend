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

  songList: Song[];
  likesongs: Likesong[];
  status: boolean;
  song: Song;
  user: Users;
  like: Likesong;
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
    });
    this.likesongService.getAllLikesong().subscribe(res => {
      this.likesongs = res;
      console.log(this.likesongs);

    });
    this.userId = Number(this.httpClient.getID());
    console.log(this.userId);

    this.likesongService.getLikesong(this.song.id).subscribe(res => {
      this.like = res;
      console.log(this.like);
    });
  }

  // tslint:disable-next-line:typedef
  likesong(data1, data2) {
    this.songService.getSongById(this.song.id).subscribe(res => {
      this.song = res;
      console.log(this.song);
    });

    // this.like.status = !this.like.status;
    if (data1 === true){
      data2--;
      data1 = false;
      console.log(data1);
      console.log(data2);
    }else {
      data2++;
      data1 = true;
      console.log(data1);
      console.log(data2);
      this.song.countLike = data2;
    }
    console.log(data2);
    this.likesongService.updateLikesong(this.like).subscribe( res => {
      // alert(res.message);
      console.log(data2);
    });
    this.songService.updateSong(this.song).subscribe();
    console.log(data1);
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
      console.log(res);
    });
    console.log(data1);
    console.log(data2);
  }

}
