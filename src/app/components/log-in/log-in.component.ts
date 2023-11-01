
import { Component,OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

    @Input()
    mail: string=''
    password: string=''

    constructor(private userService: UserService ){}
    ngOnInit(){}

    validateEmail(mail: string){
      this.userService.getByEmail(mail)
      .then(response=>{
        console.log(response)
      })
      .catch(error=>{console.log('no anduve')});
    }
}
