import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

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
  private mail='';

  
  constructor(private http: HttpClient) {
   }

   getOnline(){
    return this.onLine;
   }

   setOffLine(){
    this.onLine=false;
   }

   setOnLine(){
    this.onLine=true;
   }

  getByEmail(mail: string): Promise<any>{
    return this.http.get(this.apiValidationEmailUrl+mail)
    .toPromise();
  }

  getBetHistory(): Promise<any>{
    return this.http.get(this.apiBetHistory+3)
    .toPromise();
  }

  getPendingBets(): Promise<any>{
    return this.http.get(this.apiPendingBets+3)
    .toPromise();
  }

  getTransactions(): Promise<any>{
    return this.http.get(this.apiTransactionHistory+3)
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
      return this.http.post(this.apiAddUser,this.user,httpOptions)
      .toPromise();
  }

  deleteUser(): Promise<any>{
    return this.http.delete(this.apiDeleteUser+this.user.id)
    .toPromise();
  }

  modifyUser(): Promise<any>{
    return this.http.put(this.apiUpdateUser+this.user.id,this.user)
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
  }

  modifyBetBalance(amount :number){
    this.user.betBalance+=amount;
    this.modifyUser().then((Response)=>{
      console.log(Response);
    })
  }

  modifyBalance(amount : number){
    this.user.balance+=amount;
    this.modifyUser().then((Response)=>{
      console.log(Response);
    })
  }

  getUserData(){
    return this.user;
  }

  userLogOut(){
    this.user=new User;
    this.onLine=false;
  }
  
}
