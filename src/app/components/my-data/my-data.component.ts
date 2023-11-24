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
  }
}
