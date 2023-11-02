import { Component,OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent {

  teams: any[]=[];

  constructor(private tournamentService: TournamentsService){}

  ngOnInit(){
    this.tournamentService.getTournamentTeams(this.tournamentService.CurrentLeague)
    .then((response)=>{
      this.tournamentService.setTeams(response)
      console.log(response);
      this.teams=this.tournamentService.teams;
    })
    .catch((error)=>{
      console.log(error);   
    })
  }

  setActualTeam(teamId :number){
    this.tournamentService.setActualTeam(teamId);
  }
}
