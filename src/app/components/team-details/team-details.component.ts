import { Component } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent {

  Team : any;
  teamNextFixtures: any=[];
  response: any;

  constructor(private tournamentService: TournamentsService){}

  ngOnInit(){

    console.log(this.tournamentService.getToDate());
    console.log('arriba de esto deberia estar la todate');
    this.tournamentService.getTeamData(this.tournamentService.CurrentTeam)
    .then((Response)=>{
      console.log(Response);
      this.response=Response;
      this.Team=this.response.response[0];
      console.log(this.Team);
      console.log('arriba de esto logueo el response del team')
    })
    this.tournamentService.getTeamNextFixtures(this.tournamentService.CurrentTeam)
    .then((Response)=>{
      console.log(Response);
      this.response=Response;
      this.teamNextFixtures=this.response.response;
    })
  }

}
