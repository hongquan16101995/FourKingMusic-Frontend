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

  getAllPlaylistsNew(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(API_URL + '/home/playlist/new');
  }

  getPlaylistById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(API_URL + '/home/playlist' + id);
  }

  getPlaylistByName(name: string): Observable<Playlist[]> {
    return this.http.post<Playlist[]>(API_URL + '/home/song/search', name);
  }

  createPlaylist(playlist: Playlist): Observable<any> {
    return this.http.post(API_URL + '/playlist', playlist, this.httpService.getHttp());
  }

  updatePlaylist(playlist: Playlist): Observable<any> {
    return this.http.put(API_URL + '/playlist/update' , playlist  , this.httpService.getHttp());
  }

  updateSongOfPlaylist(id: number, song: Song): Observable<any> {
    return this.http.put(API_URL + '/playlist/' + id, song, this.httpService.getHttp());
  }

  deletePlaylist(id: number, userId: number): Observable<any> {
    // @ts-ignore
    return this.http.delete(API_URL + '/playlist/' + id, userId, this.httpService.getHttp());
  }

  deleteSongOfPlaylist(id: number, songId: number): Observable<any> {
    // @ts-ignore
    return this.http.delete(API_URL + '/playlist/song/' + id, songId, this.httpService.getHttp());
  }
}
