import { Component, OnInit } from '@angular/core';
import { Bet } from 'src/app/models/Bet';
import { Transaction } from 'src/app/models/Transaction';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activity-history',
  templateUrl: './activity-history.component.html',
  styleUrls: ['./activity-history.component.css']
})
export class ActivityHistoryComponent {
  betsHistory: Bet[] = [];
  transactionHistory: Transaction[] = []

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getBetHistory()
      .then((Response) => {
        this.betsHistory = Response;
        console.log('esto trajo el bet history');
        console.log(Response);
      })

    this.userService.getTransactions()
      .then((Response) => {
        this.transactionHistory = Response;
      })
  }
}
