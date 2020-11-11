import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {LikesongService} from '../../../service/likesong.service';
import {Likesong} from '../../../model/Likesong';
import {HttpService} from '../../../service/http.service';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit {

  songList: Song[];
  likesongs: Likesong[];
  song: Song;
  like: Likesong;
  userId: number;
  status: boolean;
  countLike: number;
  p: number;

  constructor(private songService: SongService,
              private likesongService: LikesongService,
              private httpClient: HttpService) {
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
    });
    this.likesongService.getAllLikesong().subscribe(res => {
      this.likesongs = res;
    });
    this.userId = Number(this.httpClient.getID());
    for (let like of this.likesongs){
      like.status;
    }
  }

  // tslint:disable-next-line:typedef

  likesong(data1, data2, data3, data4) {
    // this.likesongService.getLikesong(data3).subscribe(res => {
    //   this.like = res;
    //   console.log(this.like);
    // });
    //
    // this.songService.getSongById(data4).subscribe( res => {
    //   this.song = res;
    // });

    // this.like.status = !this.like.status;
    if (data1 === true){
      data2++;
      data1 = false;
    }else {
      data2--;
      data1 = true;
    }
    this.status = data1;
    this.countLike = data2;
    // this.song.countLike = data2;
    // this.likesongService.updateLikesong(this.like).subscribe( res => {
    //   alert(res.message);
    // });
    // this.songService.updateSong(this.song).subscribe();
    // this.songService.getAllSongs().subscribe(res => {
    //   this.songList = res;
    // });
    console.log(data1);
    console.log(data2);
  }

}
