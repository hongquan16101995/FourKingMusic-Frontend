import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './home/layout/layout.component';
import {LoginComponent} from './core/login/login.component';
import {RegisterComponent} from './core/register/register.component';
import {CreatSongComponent} from './song/creat-song/creat-song.component';
import {DeleteSongComponent} from './song/delete-song/delete-song.component';
import {UserMysongComponent} from './user/user-mysong/user-mysong.component';

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
    path: 'creatSong',
    component: CreatSongComponent
  },
  {
    path: 'deleteSong',
    component: DeleteSongComponent
  },
  {
    path: 'mysong',
    component: UserMysongComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
