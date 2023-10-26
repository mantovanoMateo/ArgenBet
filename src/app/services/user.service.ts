import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user=new User;
  private onLine=false;
  
  constructor() { }
}
