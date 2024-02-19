import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Bet } from 'src/app/models/Bet';
import { UserService } from 'src/app/services/user.service';

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
  onLine: boolean=false;
  constructor(private tournamentService: TournamentsService, private cartService: CartService, private userService: UserService) { }

  ngOnInit() {
    this.tournaments = this.tournamentService.Tournaments;
    this.cartService.bets.subscribe(bets => {
      this.bets = bets;
      //console.log(bets);
    })
    this.cartService.total.subscribe(total => {
      this.total=total;
      //console.log(total);
    })
    this.onLine=this.userService.getOnline();
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
    let re= new RegExp('\d')
    this.bets.forEach((bet) => {
      input = document.getElementById('betValue' + bet.id) as HTMLInputElement;
      value = parseFloat(input.value);
      //console.log('estoy antes del if')
      if (!Number.isNaN(value) && this.verifyValue(value.toString())) {
        indexOfObject = this.bets.findIndex((obj) => {
          return obj.id === bet.id;
        });
        this.cartService.updateBetValue(indexOfObject, value);
      } else {
        oneIsNull = true;
      }
    })
    if (oneIsNull) {
      //console.log('no debes dejar apuestas sin valores');
      this.cartOK=false;
    } else if(!oneIsNull){
      this.cartOK=true;
    }else{
      this.cartOK=false; 
    }
  }

  getBetPossible(){
    return this.userService.getBetableBalance()>=this.total;
  }

  verifyValue(value: string){
    let verify=false;
    if(value.indexOf('-')==-1 && value.indexOf('+')==-1 &&value.indexOf('.')==-1){
      verify=true;
    }
    /*
    console.log('===================================');
    console.log(verify);
    console.log('estamos validando el valor => '+ value);
    console.log('valida -');
    console.log(value.indexOf('-'));
    console.log('valida +');
    console.log(value.indexOf('+'));
    console.log('valida .');
    console.log(value.indexOf('.'));
    */
    return verify;
  }

  confirmBet(){
    this.cartService.confirmBet();
  }

  getProfit(betedValue: number, benefit:number){
    let profit=0;
    profit=(betedValue*benefit)-betedValue;
    return profit.toFixed(2);
  }

  resetTotal(){
    this.cartService.resetTotal();
  }

  setLeague(id : number){
    this.tournamentService.setCurrentLeauge(id);
  }
}
