import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { debounceTime,takeUntil,switchMap, Subject } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  passwordsMatch = false;
  private destroy$:Subject<void> = new Subject();
  constructor(private userService: UserService, private customvalidator : CustomValidatorsService, private router: Router){}

  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50),this.customvalidator.onlyLetters()]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50),this.customvalidator.onlyLetters()]),
    dni: new FormControl('', [Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(8),Validators.minLength(7)]),
    phone: new FormControl('', [Validators.required,Validators.pattern('[+0-9]+'),Validators.minLength(7)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
    confirmPassword: new FormControl('',Validators.required),
    birthDate: new FormControl('', [Validators.required, this.customvalidator.Older18andyounger140Validator(),this.customvalidator.dateOfBirthValidator()]),
  });
  ngOnInit() {
    this.signUpForm
      .get('confirmPassword')
      ?.setAsyncValidators(this.passwordMatchValidator.bind(this));

    this.signUpForm
      .get('password')
      ?.valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(() => {
        this.signUpForm.get('confirmPassword')?.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false,
        });
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private passwordMatchValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | import('rxjs').Observable<ValidationErrors | null> {
    const password = this.signUpForm.get('password')?.value;
    const confirmPassword = control.value;

    this.passwordsMatch = password === confirmPassword;
    return of(this.passwordsMatch ? null : { mismatch: true }).pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    );
  }
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
