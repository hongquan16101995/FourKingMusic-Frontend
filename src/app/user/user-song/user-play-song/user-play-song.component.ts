import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {Singers} from '../../../model/Singers';
declare var Amplitude: any;

@Component({
  selector: 'app-user-play-song',
  templateUrl: './user-play-song.component.html',
  styleUrls: ['./user-play-song.component.css']
})
export class UserPlaySongComponent implements OnInit {

  id: number;
  song: Song;
  avaUrl: string;
  name: string;
  singers: Singers[];
  fileURL: string;
  user: string;

  constructor(private songService: SongService,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.songService.getSongById(this.id).subscribe(data => {
      this.song = {
        id: data.id,
        user: data.user,
        singers: data.singers,
        dateCreated: data.dateCreated,
      };
      this.avaUrl = data.avatarUrl;
      this.name = data.name;
      this.singers = data.singers;
      this.fileURL = data.fileUrl;
      this.user = data.user.name;

      Amplitude.init({
        songs: [
          {
            url: data.fileUrl,
            cover_art_url: data.avatarUrl
          },
        ],
      });
    });
  }
}
