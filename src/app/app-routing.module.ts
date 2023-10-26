import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { DefautlMenuComponent } from './components/defautl-menu/defautl-menu.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MyBetsComponent } from './components/my-bets/my-bets.component';

const routes: Routes = [
  {path: 'logIn', component:LogInComponent},
  {path: 'signUp', component:SignUpComponent},
  {path: 'mainMenu', component:MainMenuComponent,
   children:[
    {path: 'defaultMenu', component:DefautlMenuComponent},
    {path: 'teams', component:TeamsComponent},
    {path: 'mybets', component:MyBetsComponent}
   ]
  },
  {path: '', redirectTo:'/mainMenu/defaultMenu', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
