import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../../service/http.service';


@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.css']
})
export class DeleteSongComponent implements OnInit {

  song: Song = {};
  userid: number;
  constructor(private songService: SongService,
              private httpService: HttpService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    if (confirm('Are you sure?')) {
      this.songService.getSongById(id).subscribe(data => {
        this.song = data;
      });
    }
  }

  onDelete(): void {
    this.userid = Number(this.httpService.getID());
    this.songService.deleteSong(this.song.id).subscribe(() => {
      alert('Deleted song successfully');
    });
  }
}
