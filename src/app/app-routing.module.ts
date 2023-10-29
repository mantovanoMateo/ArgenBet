import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'logIn', component: LogInComponent },
  { path: 'signUp', component: SignUpComponent },
  {
    path: 'myProfile',
    component: MyProfileComponent,
    children: [
      { path: 'myData', component: MyDataComponent },
      { path: 'activityHistory', component: ActivityHistoryComponent },
      { path: 'atm', component: AtmComponent}
    ],
  },
  {
    path: 'mainMenu',
    component: MainMenuComponent,
    children: [
      { path: 'defaultMenu', component: DefautlMenuComponent },
      {
        path: 'teams',
        component: TeamsComponent,
        children: [
          { path: 'teamList', component: TeamListComponent },
          { path: 'teamDetails', component: TeamDetailsComponent },
        ],
      },
      { path: 'mybets', component: MyBetsComponent },
    ],
  },
  { path: '', redirectTo: '/mainMenu/defaultMenu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
