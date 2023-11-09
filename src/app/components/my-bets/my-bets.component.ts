import { Component, OnInit } from '@angular/core';
import { Bet } from 'src/app/models/Bet';
import { BetService } from 'src/app/services/bet.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-bets',
  templateUrl: './my-bets.component.html',
  styleUrls: ['./my-bets.component.css']
})
export class MyBetsComponent {
  bets=new Array<Bet>;
  myBets=new Array<Bet>;
  cartOK=false;
  total: number=0;

  constructor(private betService: BetService,private userService: UserService,private cartService: CartService){}

  ngOnInit(){
    this.cartService.bets.subscribe(bets=>{
      this.bets=bets;
    })
    this.cartService.total.subscribe(total => {
      this.total=total;
      console.log(total);
    })
    this.userService.getPendingBets()
    .then((Response)=>{
      this.myBets=Response;
    }) 
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

  deleteBet(bet: Bet){
    this.betService.deleteBet(bet.id).then((Response)=>{console.log('elimine la apuesta'+ Response)});
    this.userService.modifyBetBalance(-(bet.betValue));
    let index=this.myBets.findIndex((obj)=>{
      return obj.id === bet.id;
    });
    this.myBets.splice(index,1);
  }

  deleteBetFromCart (bet: Bet){
    this.cartService.delete(bet);
  }

  updateBet(bet: Bet){
    let input=document.getElementById('newBetValue'+bet.id) as HTMLInputElement;
    let value=parseFloat(input.value);
    let betVariation=value-bet.betValue;
    bet.betValue=value;
    this.betService.modifyBet(bet)
    .then((Response)=>{
      console.log(Response);
    })
    this.userService.modifyBetBalance(betVariation);
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

}
