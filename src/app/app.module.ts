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
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { MyDataComponent } from './components/my-data/my-data.component';
import { ActivityHistoryComponent } from './components/activity-history/activity-history.component';
import { AtmComponent } from './components/atm/atm.component';
import { BetFixtureComponent } from './components/bet-fixture/bet-fixture.component';
import { BetFixtureListComponent } from './components/bet-fixture-list/bet-fixture-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    MainMenuComponent,
    DefautlMenuComponent,
    TeamsComponent,
    MyBetsComponent,
    MyProfileComponent,
    TeamListComponent,
    TeamDetailsComponent,
    MyDataComponent,
    ActivityHistoryComponent,
    BetFixtureComponent,
    BetFixtureListComponent,
    AtmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
