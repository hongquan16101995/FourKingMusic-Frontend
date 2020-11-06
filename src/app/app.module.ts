import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './core/login/login.component';
import {RegisterComponent} from './core/register/register.component';
import {NavbarMenuComponent} from './home/navbar-menu/navbar-menu.component';
import {NowPlayingBarComponent} from './home/now-playing-bar/now-playing-bar.component';
import {LayoutComponent} from './home/layout/layout.component';
import {ListSongComponent} from './song/list-song/list-song.component';
import {HttpClientModule} from '@angular/common/http';
import {CreatSongComponent} from './song/creat-song/creat-song.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { DeleteSongComponent } from './song/delete-song/delete-song.component';
import { UserMysongComponent } from './user/user-mysong/user-mysong.component';
import { InformationComponent } from './core/information/information.component';
import { PasswordComponent } from './core/password/password.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarMenuComponent,
    NowPlayingBarComponent,
    LayoutComponent,
    ListSongComponent,
    CreatSongComponent,
    DeleteSongComponent,
    UserMysongComponent,
    InformationComponent,
    PasswordComponent,
    UserHomeComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
