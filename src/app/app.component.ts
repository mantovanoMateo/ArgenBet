import { Component, OnInit} from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loged: Boolean=true;
  user: User=new User;
  constructor(private userService: UserService){}

  ngOnInit(){
    this.user.lastName='Grillo';
    this.user.firstName='Pepe';
    this.user.betBalance=10000;
    this.user.balance=20000;
  }

  logOut(){
    this.userService.setOffLine();
    this.loged=false;
    this.user=new User;
  }

}
