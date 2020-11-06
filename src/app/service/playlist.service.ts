import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {Song} from '../model/Song';
import {environment} from '../../environments/environment';
import {Playlist} from '../model/Playlist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(API_URL + '/home/playlist');
  }

  getPlaylistById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(API_URL + '/home/playlist' + id);
  }

  getPlaylistByName(name: string): Observable<Playlist[]> {
    return this.http.post<Playlist[]>(API_URL + '/home/song/search', name);
  }

  createPlaylist(song: Song): Observable<Playlist> {
    return this.http.post(API_URL + '/playlist', song, this.httpService.getHttp());
  }

  updatePlaylist(song: Song): Observable<Playlist> {
    return this.http.put(API_URL + '/playlist/' + song.id, song, this.httpService.getHttp());
  }

  updateSongOfPlaylist(id: number, song: Song): Observable<Playlist> {
    return this.http.put(API_URL + '/playlist/' + id, song, this.httpService.getHttp());
  }

  deletePlaylist(id: number): Observable<Playlist> {
    return this.http.delete(API_URL + '/playlist/' + id, this.httpService.getHttp());
  }

  deleteSongOfPlaylist(id: number, song: Song): Observable<Playlist> {
    return this.http.delete(API_URL + '/playlist/song/' + id, this.httpService.getHttp());
  }
}
