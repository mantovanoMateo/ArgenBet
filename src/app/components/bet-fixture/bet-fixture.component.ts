import { Component, OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Bet } from 'src/app/models/Bet';
import { UserService } from 'src/app/services/user.service';

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
  fixture: any;

  constructor(private tournamentService: TournamentsService, private route: ActivatedRoute, private cartService: CartService, private userService:UserService) { }

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
      this.fixture=this.tournamentService.getFixture;
  }

  onClick(betValue: string, betPayment: number, betType: string, betTypeId: number){
    let bet=new Bet;
    bet.benefit=betPayment;
    bet.selection=betValue
    bet.type=betType;
    bet.typeId=betTypeId;
    bet.id=this.betId;
    bet.headToHead=this.fixture.teams.home.name+' VS '+this.fixture.teams.away.name;
    if(!this.cartService.verifyIfBetExist(bet) && !this.userService.verifyIfAlreadyBeted(bet)){
      this.betId++;
      this.cartService.add(bet);
    }
  }
}
