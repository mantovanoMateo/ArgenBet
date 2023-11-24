import { Component, OnInit} from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loged: Boolean=false;
  user: User=new User;
  constructor(private userService: UserService){
    this.userService.obsOnline.subscribe(online=>{
      this.loged=online;
    })
    this.userService.obsUser.subscribe(user=>{
      console.log('holis')
      this.user=user;
      //console.log(user);
    })
  }

  logOut(){
    this.userService.setOffLine();
    this.loged=false;
    this.user=new User;
  }

}
