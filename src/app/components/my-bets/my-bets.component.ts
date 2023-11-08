import { Component, OnInit } from '@angular/core';
import { Bet } from 'src/app/models/Bet';
import { CartService } from 'src/app/services/cart.service';

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

  constructor(private cartService: CartService){}

  ngOnInit(){
    this.cartService.bets.subscribe(bets=>{
      this.bets=bets;
    })
    this.cartService.total.subscribe(total => {
      this.total=total;
      console.log(total);
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

  deleteBet (bet: Bet){
    this.cartService.delete(bet);
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
