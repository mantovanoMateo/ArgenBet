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
    this.tournamentService.getTournamentTeams(140)
    .then((response)=>{
      this.tournamentService.setTeams(response)
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);   
    })
  }
}
