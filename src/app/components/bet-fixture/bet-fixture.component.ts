import { Component, OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Bet } from 'src/app/models/Bet';

@Component({
  selector: 'app-bet-fixture',
  templateUrl: './bet-fixture.component.html',
  styleUrls: ['./bet-fixture.component.css']
})
export class BetFixtureComponent {
  bets: any[] = [];
  betId=0;
  response: any;
  leagueName: string = '';

  constructor(private tournamentService: TournamentsService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    let fixtureId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(fixtureId);
    this.tournamentService.getFixtureOdds(fixtureId)
      .then((Response) => {
        this.response = Response;
        this.bets = this.response.response[0].bookmakers[0].bets;
        this.leagueName = this.response.response[0].league.name;
        console.log(this.response.response[0].bookmakers[0].bets);
      })
      .catch((error) => {
        console.log('no anduve' + error)
      })
  }

  onClick(betValue: string, betPayment: number, betType: string){
    let bet=new Bet;
    bet.benefit=betPayment;
    bet.selection=betValue
    bet.type=betType;
    bet.id=this.betId;
    this.betId++;
    this.cartService.add(bet);
  }
}
