import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './core/login/login.component';
import {RegisterComponent} from './core/register/register.component';
import {NavbarMenuComponent} from './home/navbar-menu/navbar-menu.component';
import {LayoutComponent} from './home/layout/layout.component';
import {ListSongComponent} from './home/song/list-song/list-song.component';
import {HttpClientModule} from '@angular/common/http';
import {CreatSongComponent} from './user/creat-song/creat-song.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SingerComponent } from './home/singer/singer-list/singer.component';
import { FooterComponent } from './home/footer/footer.component';
import { PosterComponent } from './core/poster/poster.component';
import { UserMysongComponent } from './user/user-mysong/user-mysong.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { NavbarUserComponent } from './user/navbar-user/navbar-user.component';
import { FooterUserComponent } from './user/footer-user/footer-user.component';
import { PlaySongComponent } from './home/song/play-song/play-song.component';
import {DeleteSongComponent} from './user/delete-song/delete-song.component';
import { UserEditMysongComponent } from './user/user-edit-mysong/user-edit-mysong.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { UserPlaySongComponent } from './user/user-play-song/user-play-song.component';
import {PasswordComponent} from './user/password/password.component';
import {ListNewPlaylistComponent} from './home/song/list-new-playlist/list-new-playlist.component';
import { ListNewSongComponent } from './home/song/list-new-song/list-new-song.component';
import { ListAllComponent } from './home/song/list-all/list-all.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarMenuComponent,
    LayoutComponent,
    ListSongComponent,
    CreatSongComponent,
    SingerComponent,
    FooterComponent,
    PosterComponent,
    CreatSongComponent,
    DeleteSongComponent,
    UserMysongComponent,
    PasswordComponent,
    UserHomeComponent,
    UserProfileComponent,
    UserEditMysongComponent,
    UserProfileComponent,
    NavbarUserComponent,
    FooterUserComponent,
    PlaySongComponent,
    UserPlaySongComponent,
    ListNewPlaylistComponent,
    ListNewSongComponent,
    ListAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
