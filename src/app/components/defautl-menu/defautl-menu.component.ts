import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Bet } from 'src/app/models/Bet';

@Component({
  selector: 'app-defautl-menu',
  templateUrl: './defautl-menu.component.html',
  styleUrls: ['./defautl-menu.component.css']
})
export class DefautlMenuComponent {
  private tournaments = new Array<any>;
  bets: Bet[] = [];
  cartOK=false;
  total: number=0;
  constructor(private tournamentService: TournamentsService, private cartService: CartService) { }

  ngOnInit() {
    this.tournaments = this.tournamentService.Tournaments;
    this.cartService.bets.subscribe(bets => {
      this.bets = bets;
      console.log(bets);
    })
    this.cartService.total.subscribe(total => {
      this.total=total;
      console.log(total);
    })
  }

  get Tournaments() {
    return this.tournaments;
  }

  setActualTournament(leagueId: number) {
    this.tournamentService.setCurrentLeauge(leagueId);
  }

  deleteBet(bet: Bet) {
    this.cartService.delete(bet);
  }

  verifyCart() {
    let value = 0;
    let input;
    let indexOfObject = 0;
    let oneIsNull = false;
    this.bets.forEach((bet) => {
      input = document.getElementById('betValue' + bet.id) as HTMLInputElement;
      value = parseFloat(input.value);
      if (!Number.isNaN(value)) {
        indexOfObject = this.bets.findIndex((obj) => {
          return obj.id === bet.id;
        });
        this.cartService.updateBetValue(indexOfObject, value);
      } else {
        oneIsNull = true;
      }
    })
    if (oneIsNull) {
      console.log('no debes dejar apuestas sin valores');
      this.cartOK=false;
    } else {
      console.log('todas las bets tienen valor');
      console.log(this.bets);
      this.cartOK=true; 
    }
  }

  confirmBet(){
    //this.cartService.confirmBet();
  }

  getProfit(betedValue: number, benefit:number){
    let profit=0;
    profit=(betedValue*benefit)-betedValue;
    return profit.toFixed(2);
  }

  resetTotal(){
    this.cartService.resetTotal();
  }
}
