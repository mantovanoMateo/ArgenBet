import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(private userService: UserService, private customvalidator : CustomValidatorsService, private router: Router){}

  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50),this.customvalidator.onlyLetters()]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50),this.customvalidator.onlyLetters()]),
    dni: new FormControl('', [Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(8),Validators.minLength(7)]),
    phone: new FormControl('', [Validators.required,Validators.pattern('[+0-9]+'),Validators.minLength(7)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
    birthDate: new FormControl('', [Validators.required, this.customvalidator.Older18andyounger140Validator(),this.customvalidator.dateOfBirthValidator()]),
  });

  onSubmit() {
    if (this.signUpForm.valid) {
      let user = new User();
      user.firstName = this.signUpForm.get('firstName')?.value!;
      user.lastName = this.signUpForm.get('lastName')?.value!;
      user.dni = this.signUpForm.get('dni')?.value!;
      user.phone = this.signUpForm.get('phone')?.value!;
      user.email = this.signUpForm.get('email')?.value!;
      user.gender = this.signUpForm.get('gender')?.value!;
      user.password = this.signUpForm.get('password')?.value!;

      const birthDateString: string = this.signUpForm.get('birthDate')?.value!;
      
      if (birthDateString) {
        user.birthdate = new Date(birthDateString);
        this.userService.addUser(user);
        this.router.navigate(['logIn'])
      }
    } else {
      console.error(
        'El formulario no es válido. Por favor, complete todos los campos correctamente.'
      );
    }
  }
}
