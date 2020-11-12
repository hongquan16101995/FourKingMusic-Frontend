import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../service/users.service';
import {HttpService} from '../../../service/http.service';
import {SongService} from '../../../service/song.service';
import {Song} from '../../../model/Song';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-singer-songs',
  templateUrl: './singer-songs.component.html',
  styleUrls: ['./singer-songs.component.css']
})
export class SingerSongsComponent implements OnInit {
  userId: number;
  singerId: number;
  songList: Song[] = [];
  constructor(private userService: UsersService,
              private songService: SongService,
              private httpService: HttpService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = Number(this.httpService.getID());
    this.singerId = Number(this.router.snapshot.paramMap.get('id'));
    this.songService.getSongBySinger(this.singerId).subscribe(res => {
      this.songList = res;
    });
  }

}
