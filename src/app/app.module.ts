import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { NavbarMenuComponent } from './home/navbar-menu/navbar-menu.component';
import { NowPlayingBarComponent } from './home/now-playing-bar/now-playing-bar.component';
import { LayoutComponent } from './home/layout/layout.component';
import { ListSongComponent } from './song/list-song/list-song.component';
import {HttpClientModule} from '@angular/common/http';
import { CreatSongComponent } from './song/creat-song/creat-song.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarMenuComponent,
    NowPlayingBarComponent,
    LayoutComponent,
    ListSongComponent,
    CreatSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
