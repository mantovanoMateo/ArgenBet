import { Component } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Bet } from 'src/app/models/Bet';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  private tournaments =new Array<any>;
  bets:Bet[]=[];
  cartOK=false;
  total: number=0;
  onLine=false;
  constructor(private tournamentService: TournamentsService, private cartService: CartService, private userService: UserService){ }
  
  ngOnInit(){
    this.tournaments=this.tournamentService.Tournaments;
    this.cartService.bets.subscribe(bets=>{
      this.bets=bets;
    })
    this.cartService.total.subscribe(total => {
      this.total=total;
      //console.log(total);
    })
    this.onLine=this.userService.getOnline();
  }

  get Tournaments(){
    return this.tournaments;
  }

  getTournamentTeams(leagueId :number){
    this.tournamentService.setCurrentLeauge(leagueId);
  }

  navigate(id: number){
    location.href='/mainMenu/teams/teamList/'+id;
  }

  deleteBet (bet: Bet){
    this.cartService.delete(bet);
  }

  confirmBet(){
    this.cartService.confirmBet();
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
      //console.log('no debes dejar apuestas sin valores');
      this.cartOK=false;
    } else {
      //console.log('todas las bets tienen valor');
      //console.log(this.bets);
      this.cartOK=true; 
    }
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
