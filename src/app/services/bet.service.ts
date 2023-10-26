import { Injectable } from '@angular/core';
import { Bet } from '../models/Bet';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private betList=new Array<Bet>();
  private totalBet=Number;

  constructor() { }
  
  add(bet: Bet){
    this.betList.push(bet);
  }

  delete(bet :Bet){
    let indexOfObject=this.betList.findIndex((obj)=>{
      return obj.id === bet.id;
    });
    this.betList.splice(indexOfObject,1);
  }

  modify(){
    
  }

  
}
