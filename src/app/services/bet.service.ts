import { Injectable } from '@angular/core';
import { Bet } from '../models/Bet';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private apiAddBet='http://localhost:8080/bets';
  private apiDeleteBet='http://localhost:8080/bets/delete/';
  private apiUpdateBet='http://localhost:8080/bets/update/';

  constructor(private http: HttpClient) { }

  addBet(bet : Bet){
    let response: any;
    this.http.get('http://localhost:8080/bets/lastId').toPromise()
    .then((Response)=>{
      response=Response;
      bet.id=parseInt(response,10)+1;
    })
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.post(this.apiAddBet,bet,httpOptions)
      .toPromise();
  }

  deleteBet(betId: number){
    return this.http.delete(this.apiDeleteBet+betId).toPromise();
  }

  modifyBet(bet : Bet){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.put(this.apiUpdateBet+bet.id,bet,httpOptions)
    .toPromise();
  }
  
}
