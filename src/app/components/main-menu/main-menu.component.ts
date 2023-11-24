import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  online=false;
  constructor(private userService: UserService){}
  ngOnInit(){
    this.online=this.userService.getOnline();
  }
}
