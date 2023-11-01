import { Injectable } from '@angular/core';
import { Bet } from '../models/Bet';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private apiAddBet='http://localhost:8080/bets';

  constructor(private http: HttpClient) { }

  

  
}
