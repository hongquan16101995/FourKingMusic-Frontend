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
    this.songService.getAllSongs().subscribe(data => {
      this.songList = data;
    });
  }

  // tslint:disable-next-line:typedef
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.clear();
    this.route.navigate(['']);
  }

}
