import { Component } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  private tournaments =new Array<any>;
  constructor(private tournamentService: TournamentsService){ }
  
  ngOnInit(){
    this.tournaments=this.tournamentService.Tournaments;
  }

  get Tournaments(){
    return this.tournaments;
  }

  getTournamentTeams(leagueId :number){
    this.tournamentService.setCurrentLeauge(leagueId);
  }

  navigate(id: number){
    location.href='/mainMenu/teams/teamList/'+id;
  }
}
