import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private validationEmailUrl='http://localhost:8080/users/';
  private user=new User;
  private onLine=false;
  private mail='';
  
  constructor(private http: HttpClient) { }

  getByEmail(mail: string): Promise<any>{
    return this.http.get(this.validationEmailUrl+mail)
    .toPromise();
  }
}
