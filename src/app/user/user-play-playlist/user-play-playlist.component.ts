import { Component, OnInit } from '@angular/core';
import {Song} from '../../model/Song';
import {PlaylistService} from '../../service/playlist.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-play-playlist',
  templateUrl: './user-play-playlist.component.html',
  styleUrls: ['./user-play-playlist.component.css']
})
export class UserPlayPlaylistComponent implements OnInit {

  songList: Song[];
  id: number;

  constructor(private playlistService: PlaylistService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistById(this.id).subscribe(res => {
      this.songList = res.songs;
    });
  }

  // tslint:disable-next-line:typedef
  onDeleteSongWithoutPlaylist(id){
    this.playlistService.deleteSongOfPlaylist(this.id, id).subscribe(res => {
      this.playlistService.getPlaylistById(this.id).subscribe(data => {
        this.songList = data.songs;
      });
      alert(res.message);
    });
  }
}
