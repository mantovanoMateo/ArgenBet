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
      /*
      this.tournamentService.getTournamentNextFixtures(this.tournamentService.CurrentLeague)
      .then((Response)=>{
        console.log(Response);
        this.response=Response;
        this.fixtures=this.response.response;
      })
      */
     this.tournamentService.Fixtures.subscribe(fixtures=>{
      this.fixtures=fixtures;
      console.log(fixtures);
     })
    }

    setActualFixture(fixture: any){
      this.tournamentService.setFixture(fixture);
    }

    getFixtureDateStd(fDate: String){
      return fDate.slice(0,fDate.indexOf('T'))
    }
}
