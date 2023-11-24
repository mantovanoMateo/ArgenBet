
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loged = false;
  constructor(private userService: UserService, private router: Router) {
    this.userService.obsOnline.subscribe(online => {
      this.loged = online;
    })
  }

  ngOnInit() { }


  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });


  onSubmit() {
    let email = this.logInForm.get('email')?.value!;
    let password = this.logInForm.get('password')?.value!;
    this.userService.userLogIn(email, password)
      .then((Response: any) => {
        if (Response != null) {
          //console.log('Antes de mandarlo a asignUser');
          //console.log(Response);
          this.userService.asignUser(Response);
          this.userService.setOnLine();
          if (this.loged == true) {
            this.router.navigate(['/mainMenu/defaultMenu']);
          } else {
            let alert = document.getElementById('alertNotValidLogIn') as HTMLElement;
            alert.innerText = 'Ingrese datos correctos';
            //console.log('no anduve perro');
          }
          //console.log(this.loged + ' esto es loged');
        }
      })


  }

}
