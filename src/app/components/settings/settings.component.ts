import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(private userService: UserService, private customvalidator : CustomValidatorsService){}

  settingsForm = new FormGroup({
    firstName: new FormControl(this.userService.getUserData().firstName, [Validators.required, Validators.maxLength(50),this.customvalidator.onlyLetters()]),
    lastName: new FormControl(this.userService.getUserData().lastName, [Validators.required, Validators.maxLength(50),this.customvalidator.onlyLetters()]),
    phone: new FormControl(this.userService.getUserData().phone, [Validators.required,Validators.pattern('[+0-9]+'),Validators.minLength(7)]),
    email: new FormControl(this.userService.getUserData().email, [Validators.required, Validators.email]),
    gender: new FormControl(this.userService.getUserData().gender, [Validators.required]),
    password: new FormControl(this.userService.getUserData().password, [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
  });

  onSubmit() {
    if (this.settingsForm.valid) {
      let user = new User();
      user.firstName = this.settingsForm.get('firstName')?.value!;
      user.lastName = this.settingsForm.get('lastName')?.value!;
      user.phone = this.settingsForm.get('phone')?.value!;
      user.email = this.settingsForm.get('email')?.value!;
      user.gender = this.settingsForm.get('gender')?.value!;

      user.password = this.settingsForm.get('password')?.value!; 
      this.userService.asignUser(user);
      this.userService.modifyUser();

    }
  }
}
