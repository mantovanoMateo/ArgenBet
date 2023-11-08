import { Component, OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';


@Component({
  selector: 'app-bet-fixture-list',
  templateUrl: './bet-fixture-list.component.html',
  styleUrls: ['./bet-fixture-list.component.css']
})
export class BetFixtureListComponent {
    fixtures: any[]=[];
    response: any;

    constructor(private tournamentService: TournamentsService){}

    ngOnInit(){
      this.tournamentService.getTournamentNextFixtures(this.tournamentService.CurrentLeague)
      .then((Response)=>{
        console.log(Response);
        this.response=Response;
        this.fixtures=this.response.response;
      })
    }
}
