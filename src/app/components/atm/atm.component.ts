import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.css']
})
export class AtmComponent {
  betBalance: number=0;
  balance: number=0;
  
  constructor(private userService :UserService){}

  ngOnInit(){
    this.betBalance=this.userService.getUserBetBalance();
    this.balance=this.userService.getUserBalance();
  }

  getWithdrawableBalance(){
    return this.balance-this.betBalance;
  }
}
