import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {HttpService} from '../../../service/http.service';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Users} from '../../../model/Users';
import {UsersService} from '../../../service/users.service';
declare var Swal: any;

@Component({
  selector: 'app-user-mysong',
  templateUrl: './user-mysong.component.html',
  styleUrls: ['./user-mysong.component.scss']
})
export class UserMysongComponent implements OnInit {

  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;
  p: number;
  page: number;
  songList: Song[] = [];
  playlists: Playlist[] = [];
  userid: number;
  user: Users;
  song: Song;
  playlistForm: FormGroup;

  constructor(private songService: SongService,
              private httpService: HttpService,
              private userService: UsersService,
              private playlistService: PlaylistService,
              private form: FormBuilder) {
  }

  ngOnInit(): void {
    this.playlistForm = this.form.group({
      name: [''],
    });
    this.userid = Number(this.httpService.getID());
    this.userService.getUserById(String(this.userid)).subscribe(res => {
      this.user = res;
    });
    this.songService.getSongByUser(this.userid).subscribe(res => {
      this.songList = res;
    });
    this.playlistService.getPlaylistByUser(this.userid).subscribe(res => {
      this.playlists = res;
    });
  }

  onDeleteSong(id): void {
    if (confirm('Are you sure?')) {
      this.userid = Number(this.httpService.getID());
      this.songService.deleteSong(id).subscribe(res => {
        this.songService.getSongByUser(this.userid).subscribe(data => {
          this.songList = data;
        });
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: true,
          timer: 3000
        });
      });
    }
  }

  // tslint:disable-next-line:typedef
  createPlaylist() {
    const playlist = {
      name: this.playlistForm.value.name,
      user: this.user,
    };
    this.playlistService.createPlaylist(playlist).subscribe(res => {
      this.playlistService.getPlaylistByUser(this.userid).subscribe(data => {
        this.playlists = data;
      });
      Swal.fire({
        icon: 'success',
        title: res.message,
        showConfirmButton: true,
        timer: 3000
      });
    });
  }

  onDeletePlaylist(id): void {
    if (confirm('Are you sure?')) {
      this.userid = Number(this.httpService.getID());
      this.playlistService.deletePlaylist(id).subscribe(res => {
        this.playlistService.getPlaylistByUser(this.userid).subscribe(data => {
          this.playlists = data;
        });
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: true,
          timer: 3000
        });
      });
    }
  }
}
