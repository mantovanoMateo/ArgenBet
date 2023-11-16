import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { BetPaymentService } from './bet-payment.service';
import { Bet } from '../models/Bet';
import { BetService } from './bet.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiValidationEmailUrl='http://localhost:8080/users/';
  private apiBetHistory='http://localhost:8080/bets/user/';
  private apiPendingBets='http://localhost:8080/bets/pending/';
  private apiTransactionHistory='http://localhost:8080/transactions/user/';
  private apiAddUser='http://localhost:8080/users';
  private apiDeleteUser='http://localhost:8080/users/delete/';
  private apiUpdateUser='http://localhost:8080/users/update/';
  private user=new User;
  private onLine=false;
  private _online: BehaviorSubject<boolean>;
  private _user: BehaviorSubject<User>;
  private mail='';

  
  constructor(private http: HttpClient, private betPaymentService: BetPaymentService, private betService: BetService) {
  this._online=new BehaviorSubject<boolean>(false); 
  this._user=new BehaviorSubject<User>(this.user);
  }

  get obsUser(){
    return this._user.asObservable();
  }

  get obsOnline(){
    return this._online.asObservable();
  }

   getOnline(){
    return this.onLine;
   }

   setOffLine(){
    this.onLine=false;
    this._online.next(this.onLine);
   }

   setOnLine(){
    this.onLine=true;
    this._online.next(this.onLine);
   }

   userLogIn(mail :String, password: String){
    return this.http.get('http://localhost:8080/users/login/'+mail+'/'+password)
     .toPromise();
   }

  getByEmail(mail: string): Promise<any>{
    return this.http.get(this.apiValidationEmailUrl+mail)
    .toPromise();
  }

  getBetHistory(): Promise<any>{
    return this.http.get(this.apiBetHistory+this.user.id)
    .toPromise();
  }

  getPendingBets(): Promise<any>{
    return this.http.get(this.apiPendingBets+this.user.id)
    .toPromise();
  }

  getTransactions(): Promise<any>{
    return this.http.get(this.apiTransactionHistory+this.user.id)
    .toPromise();
  }

  getWinBets(userId:number): Promise<any>{
    return this.http.get('http://localhost:8080/user/statistics/win/'+userId)
    .toPromise();
  }

  getLostBets(userId:number): Promise<any>{
    return this.http.get('http://localhost:8080/user/statistics/lost/'+userId)
    .toPromise();
  }
  
  addUser(user:User): Promise<any>{
      const httpOptions={
        headers:new HttpHeaders({'Content-Type':'application/json'})
      };
      return this.http.post(this.apiAddUser,user,httpOptions)
      .toPromise();
  }

  deleteUser(): Promise<any>{
    return this.http.delete(this.apiDeleteUser+this.user.id)
    .toPromise();
  }

  modifyUser(): Promise<any>{
    //console.log(this.user);
    this._user.next(this.user);
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.put(this.apiUpdateUser+this.user.id,this.user,httpOptions)
    .toPromise();
  }

  getUserBetBalance(){
    return this.user.betBalance;
  }

  getUserBalance(){
    return this.user.balance;
  }

  asignUser(user: User){
    this.user=user;
    this.user.id=user.id;
    this._user.next(this.user);
  }

  modifyBetBalance(amount :number){
    this.user.betBalance+=amount;
    this.modifyUser().then((Response)=>{
      //console.log(Response);
    })
  }

  modifyBalance(amount : number){
    this.user.balance+=amount;
    this.modifyUser().then((Response)=>{
      //console.log(Response);
    })
  }

  getUserData(){
    return this.user;
  }

  userLogOut(){
    this.user=new User;
    this.onLine=false;
  }

  verifyIfAlreadyBeted(bet:Bet){
    let response:Bet[];
    let exist: boolean=false;
    this.getPendingBets()
    .then((Response)=>{
      response=Response;
      response.forEach((betEx)=>{
      if(betEx.typeId==bet.typeId && betEx.selection==bet.selection){
        exist=true;
      }
    })
    })
    return exist;
  }

  getBetableBalance(){
    return this.user.balance-this.user.betBalance;
  }

  checkAndPayBets(){
    let response:Bet[];
    let payOrNot='';
    this.getPendingBets()
    .then((Response)=>{
      response=Response;
      response.forEach((bet:Bet) => {
        payOrNot=this.betPaymentService.betPaymentMaster(bet);
        if(payOrNot=='WIN'){
          this.user.betBalance-=bet.betValue;
          this.user.balance+=((bet.betValue*bet.benefit)-bet.betValue);
          bet.betStatus='WIN';
          this.betService.modifyBet(bet);
          this.modifyUser().then((Response)=>{console.log('pago una apuesta')});
        }else if(payOrNot=='LOST'){
          this.user.betBalance-=bet.betValue;
          this.user.balance-=bet.betValue;
          bet.betStatus='LOST';
          this.betService.modifyBet(bet);
          this.modifyUser().then((Response)=>{console.log('perdio una apuesta')});
        }
      });
    })
  }
  
}
