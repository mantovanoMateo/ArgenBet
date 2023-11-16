import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent {

  teams: any[]=[];

  constructor(private tournamentService: TournamentsService, private route: ActivatedRoute){}

  ngOnInit(){
    let currentLeagueId=Number(this.route.snapshot.paramMap.get('id'));
    //console.log('esta es la id q nos trae '+currentLeagueId);
    this.tournamentService.getTournamentTeams(currentLeagueId)
    .then((response)=>{
      this.tournamentService.setTeams(response)
      //console.log(response);
      this.teams=this.tournamentService.teams;
    })
    .catch((error)=>{
      //console.log(error);   
    })
  }

  setActualTeam(teamId :number){
    this.tournamentService.setActualTeam(teamId);
  }
}
