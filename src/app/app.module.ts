import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { DefautlMenuComponent } from './components/defautl-menu/defautl-menu.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MyBetsComponent } from './components/my-bets/my-bets.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    MainMenuComponent,
    DefautlMenuComponent,
    TeamsComponent,
    MyBetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
