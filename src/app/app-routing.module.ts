import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './home/layout/layout.component';
import {LoginComponent} from './core/login/login.component';
import {RegisterComponent} from './core/register/register.component';
import {CreatSongComponent} from './user/creat-song/creat-song.component';
import {UserMysongComponent} from './user/user-mysong/user-mysong.component';
import {AuthGuardGuard} from './guard/auth-guard.guard';
import {UserHomeComponent} from './user/user-home/user-home.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {PlaySongComponent} from './song/play-song/play-song.component';
import {DeleteSongComponent} from './user/delete-song/delete-song.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'song/:id', component: PlaySongComponent
  },
  {
    path: 'creatSong',
    component: CreatSongComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'deleteSong',
    component: DeleteSongComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'mysong',
    component: UserMysongComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'userHome',
    component: UserHomeComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [AuthGuardGuard]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
