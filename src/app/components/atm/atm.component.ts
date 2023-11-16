import { Component, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { Transaction } from 'src/app/models/Transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.css']
})
export class AtmComponent {
  betBalance: number = 0;
  balance: number = 0;
  withdraw: boolean = true;
  paymentMethods = [
    { name: 'Tarjeta de crédito', selected: true },
    { name: 'Tarjeta de débito', selected: false },
    { name: 'Transferencia bancaria', selected: false },
    { name: 'PayPal', selected: false },
    { name: 'Mercado Pago', selected: false }
  ];

  constructor(private userService: UserService, private transactionService: TransactionService) { }

  ngOnInit() {
    this.betBalance = this.userService.getUserBetBalance();
    this.balance = this.userService.getUserBalance();
  }

  getWithdrawableBalance() {
    return this.balance - this.betBalance;
  }
  updateSelectedPaymentMethod(selectedMethod: any) {
    this.paymentMethods.forEach(method => {
      method.selected = method === selectedMethod;
    });
  }

  withdrawMoney() {
    let input = document.getElementById('withdrawAmount') as HTMLInputElement;
    let amount = parseFloat(input.value);
    if (this.getWithdrawableBalance() - amount >= 0) {
      this.userService.modifyBalance(-amount);
      this.balance -= amount;
      let transaction = new Transaction();
      transaction.transactionTotal = amount;
      transaction.type = 'Widthdraw';
      transaction.userId = this.userService.getUserData().id;
      this.transactionService.addTransaction(transaction);
    } else {
      this.withdraw = false;
    }
  }

  depositMoney() {
    let input = document.getElementById('moneyDeposit') as HTMLInputElement;
    let amount = parseFloat(input.value);
    this.userService.modifyBalance(amount);
    let transaction = new Transaction();
    transaction.transactionTotal = amount;
    transaction.type = 'Deposit';
    transaction.userId = this.userService.getUserData().id;
    this.transactionService.addTransaction(transaction);
    this.balance += amount;
  }
}
