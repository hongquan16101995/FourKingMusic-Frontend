import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './core/login/login.component';
import {RegisterComponent} from './core/register/register.component';
import {NavbarMenuComponent} from './home/navbar-menu/navbar-menu.component';
import {NowPlayingBarComponent} from './home/now-playing-bar/now-playing-bar.component';
import {LayoutComponent} from './home/layout/layout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarMenuComponent,
    NowPlayingBarComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
