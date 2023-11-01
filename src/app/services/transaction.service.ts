import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiAddTransaction='http://localhost:8080/transactions';
  constructor(private http: HttpClient) { }

  addTransaction(transaction: Transaction): Promise<any>{
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.post(this.apiAddTransaction,transaction,httpOptions)
    .toPromise();
  }

  


}
