import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';
import {Song} from '../../../model/Song';

declare var Amplitude: any;

@Component({
  selector: 'app-play-playlist',
  templateUrl: './play-playlist.component.html',
  styleUrls: ['./play-playlist.component.css']
})
export class PlayPlaylistComponent implements OnInit {


  constructor(private playlistService: PlaylistService,
              private router: ActivatedRoute) {
  }

  id: number;
  playList: Playlist;
  songs: Song[] = [];
  abc: string;
  xadsad: string;

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistById(this.id).subscribe(data => {
      this.playList = data;
      this.songs = this.playList.songs;
    });
  }

  // tslint:disable-next-line:typedef
  sendValue(nameSong: string , avaSong: string) {
    this.abc = nameSong;
    this.xadsad = avaSong;
  }
}

