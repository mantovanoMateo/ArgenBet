import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http'

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
  
  constructor(private http: HttpClient) { }

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

  addUser(): Promise<any>{
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


}
