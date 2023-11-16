
import { Component,OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
    constructor(private userService: UserService ){}
    ngOnInit(){}
    logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('',Validators.required)
    });
    onSubmit(){
      let email = this.logInForm.get('email')?.value!;
      let password=this.logInForm.get('password')?.value!;
      
    }
    // validateEmail(mail: string){
    //   this.userService.getByEmail(mail)
    //   .then(response=>{
    //     console.log(response)
    //   })
    //   .catch(error=>{console.log('no anduve')});
    // }
}
