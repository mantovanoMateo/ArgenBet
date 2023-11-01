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
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.post(this.apiAddBet,bet,httpOptions)
      .toPromise();
  }

  deletebet(betId: number){
    return this.http.delete(this.apiDeleteBet+betId).toPromise();
  }

  modifyBet(bet : Bet){
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.put(this.apiUpdateBet+bet.id,bet,httpOptions);
  }
  
}
