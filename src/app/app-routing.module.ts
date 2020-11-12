import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './home/layout/layout.component';
import {LoginComponent} from './core/login/login.component';
import {RegisterComponent} from './core/register/register.component';
import {AuthGuardGuard} from './guard/auth-guard.guard';
import {UserHomeComponent} from './user/user-home/user-home.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {PlaySongComponent} from './home/song/play-song/play-song.component';
import {AllSongsComponent} from './home/song/all-songs/all-songs.component';
import {UserPlaySongComponent} from './user/user-song/user-play-song/user-play-song.component';
import {CreatSongComponent} from './user/user-song/creat-song/creat-song.component';
import {UserMysongComponent} from './user/user-song/user-mysong/user-mysong.component';
import {UserEditMysongComponent} from './user/user-song/user-edit-mysong/user-edit-mysong.component';
import {AllPlaylistComponent} from './home/song/all-playlist/all-playlist.component';
import {ListSongSearchComponent} from './home/song/list-song-search/list-song-search.component';
import {PasswordComponent} from './user/password/password.component';
import {SingerSongsComponent} from './home/singer/singer-songs/singer-songs.component';
import {UserPlaylistComponent} from './user/user-playlist/user-playlist.component';
import {PlayPlaylistComponent} from './home/song/play-playlist/play-playlist.component';
import {UserPlayPlaylistComponent} from './user/user-play-playlist/user-play-playlist.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'songs', component: AllSongsComponent
  },
  {
    path: 'playlists', component: AllPlaylistComponent
  },
  {
    path: 'search', component: ListSongSearchComponent
  },
  {
    path: 'playlist/:id', component: UserPlaylistComponent
  },
  {
    path: 'song/:id', component: PlaySongComponent
  },
  {
    path: 'singer/:id', component: SingerSongsComponent
  },
  {
    path: 'playlist/play/:id', component: PlayPlaylistComponent
  },
  {
    path: 'home',
    component: UserHomeComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'home/song/:id',
    component: UserPlaySongComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'home/playlist/play/:id',
    component: UserPlayPlaylistComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'home/playlist/:id',
    component: UserPlaylistComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'creatSong',
    component: CreatSongComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'changePassword',
    component: PasswordComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'mysong',
    component: UserMysongComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'mysong/:id/edit',
    component: UserEditMysongComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'songs',
    component: AllSongsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'playlists',
    component: AllPlaylistComponent,
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
