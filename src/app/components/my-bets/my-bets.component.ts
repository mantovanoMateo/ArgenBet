import { Component } from '@angular/core';
import { Bet } from 'src/app/models/Bet';

@Component({
  selector: 'app-my-bets',
  templateUrl: './my-bets.component.html',
  styleUrls: ['./my-bets.component.css']
})
export class MyBetsComponent {
  bets=new Array<Bet>;
}
