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
  paymentMethods = [
    { name: 'Tarjeta de crédito', selected: true },
    { name: 'Tarjeta de débito', selected: false },
    { name: 'Transferencia bancaria', selected: false },
    { name: 'PayPal', selected: false },
    { name: 'Mercado Pago', selected: false}
  ];
  
  constructor(private userService :UserService){}

  ngOnInit(){
    this.betBalance=this.userService.getUserBetBalance();
    this.balance=this.userService.getUserBalance();
  }

  getWithdrawableBalance(){
    return this.balance-this.betBalance;
  }
  updateSelectedPaymentMethod(selectedMethod: any) {
    this.paymentMethods.forEach(method => {
      method.selected = method === selectedMethod;
    });
  }
}
