import { Injectable } from '@angular/core';
import { Bet } from '../models/Bet';
import { BetService } from './bet.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private betList=new Array<Bet>();
  private _products: BehaviorSubject<Bet[]>;
  private totalBet: number=0;
  private _total: BehaviorSubject<number>;

  constructor(private betService: BetService) {
    this._products=new BehaviorSubject<Bet[]>([]);
    this._total=new BehaviorSubject<number>(0);
   }

  add(bet: Bet){
    this.betList.push(bet);
    this._products.next(this.betList);
  }

  get bets(){
    return this._products.asObservable();
  }

  get total(){
    return this._total.asObservable();
  }

  delete(bet :Bet){
    let indexOfObject=this.betList.findIndex((obj)=>{
      return obj.id === bet.id;
    });
    this.betList.splice(indexOfObject,1);
    this._products.next(this.betList);
  }

  updateBetValue(betIndex: number, betValue:number){
    this.betList[betIndex].betValue=betValue;
    this._products.next(this.betList);
    this.totalBet+=betValue;
    this._total.next(this.totalBet);
  }

  confirmBet(){
    this.betList.forEach(bet=>{
      this.betService.addBet(bet)
        .then((Response)=>{console.log('carge una bet')})
        .catch((error)=>{console.log('no anduve')});
    })
    
    this.betList=new Array<Bet>;
    this._products.next(this.betList);
    
  }

  resetTotal(){
    this.totalBet=0;
    this._total.next(this.totalBet);
  }
  
}
