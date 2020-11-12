import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Song} from '../../model/Song';
import {SongService} from '../../service/song.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  songList: Song[] = [];

  constructor(private route: Router,
              private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
    });
  }

  // tslint:disable-next-line:typedef
  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.clear();
    this.route.navigate(['']);
  }

}
