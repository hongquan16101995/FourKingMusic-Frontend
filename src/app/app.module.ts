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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SingerComponent } from './home/singer/singer-list/singer.component';
import { FooterComponent } from './home/footer/footer.component';
import { PosterComponent } from './core/poster/poster.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { NavbarUserComponent } from './user/navbar-user/navbar-user.component';
import { FooterUserComponent } from './user/footer-user/footer-user.component';
import { PlaySongComponent } from './home/song/play-song/play-song.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {PasswordComponent} from './user/password/password.component';
import {ListNewPlaylistComponent} from './home/song/list-new-playlist/list-new-playlist.component';
import { ListNewSongComponent } from './home/song/list-new-song/list-new-song.component';
import { ListAllComponent } from './home/song/list-all/list-all.component';
import { PlayPlaylistComponent } from './home/song/play-playlist/play-playlist.component';
import { UserPlayPlaylistComponent } from './user/user-play-playlist/user-play-playlist.component';
import {CreatSongComponent} from './user/user-song/creat-song/creat-song.component';
import {DeleteSongComponent} from './user/user-song/delete-song/delete-song.component';
import {UserPlaySongComponent} from './user/user-song/user-play-song/user-play-song.component';
import {UserEditMysongComponent} from './user/user-song/user-edit-mysong/user-edit-mysong.component';
import {UserMysongComponent} from './user/user-song/user-mysong/user-mysong.component';
import { AllSongsComponent } from './home/song/all-songs/all-songs.component';
import { AllPlaylistComponent } from './home/song/all-playlist/all-playlist.component';
import { TestPlayComponent } from './home/song/test-play/test-play.component';

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
    PasswordComponent,
    UserHomeComponent,
    UserProfileComponent,
    UserProfileComponent,
    NavbarUserComponent,
    FooterUserComponent,
    PlaySongComponent,
    ListNewPlaylistComponent,
    ListNewSongComponent,
    ListAllComponent,
    PlayPlaylistComponent,
    UserPlayPlaylistComponent,
    UserPlaySongComponent,
    UserEditMysongComponent,
    UserMysongComponent,
    AllSongsComponent,
    AllPlaylistComponent,
    TestPlayComponent
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
