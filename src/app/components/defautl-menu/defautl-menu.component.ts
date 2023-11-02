import { Component, OnInit, Input } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-defautl-menu',
  templateUrl: './defautl-menu.component.html',
  styleUrls: ['./defautl-menu.component.css']
})
export class DefautlMenuComponent {
  private tournaments =new Array<any>;
  constructor(private tournamentService: TournamentsService){ }
  
  ngOnInit(){
    this.tournaments=this.tournamentService.Tournaments;
  }

  get Tournaments(){
    return this.tournaments;
  }
}
