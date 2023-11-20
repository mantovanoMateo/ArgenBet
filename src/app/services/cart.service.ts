import { Injectable } from '@angular/core';
import { Bet } from '../models/Bet';
import { BetService } from './bet.service';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private betList=new Array<Bet>();
  private _products: BehaviorSubject<Bet[]>;
  private totalBet: number=0;
  private _total: BehaviorSubject<number>;

  constructor(private betService: BetService, private userService: UserService) {
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
      bet.userId=this.userService.getUserData().id;
      this.betService.addBet(bet)
        .then((Response)=>{
          this.userService.modifyBetBalance(bet.betValue);
        })
        .catch((error)=>{console.log('no anduve')});
    })
    
    this.betList=new Array<Bet>;
    this._products.next(this.betList);
    
  }

  verifyIfBetExist(bet : Bet){
    let exist: boolean=false;
    this.betList.forEach((betEx)=>{
      if(betEx.typeId==bet.typeId && betEx.selection==bet.selection){
        exist=true;
      }
    })
    return exist;
  }

  resetTotal(){
    this.totalBet=0;
    this._total.next(this.totalBet);
  }
  
}
