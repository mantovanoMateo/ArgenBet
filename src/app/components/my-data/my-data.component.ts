import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.css']
})
export class MyDataComponent {
  user:User=new User;
  constructor(private userService: UserService){}

  ngOnInit(){
    this.user=this.userService.getUserData();
    this.user.firstName='Mateo';
    this.user.lastName='Mantovano';
    this.user.dni='42322678';
    this.user.balance=50000;
    this.user.gender='Hombre';
    this.user.phone='2235419207';
    this.user.email='mantovanomateo@gmail.com'
  }
}
