import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup,FormControl,Validators, ValidationErrors } from '@angular/forms';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { User } from 'src/app/models/User';
import { AbstractControl } from '@angular/forms';
import { Subject, debounceTime, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  passwordsMatch = false;
  private destroy$:Subject<void> = new Subject();
  constructor(private userService: UserService, private customvalidator : CustomValidatorsService){}

  settingsForm = new FormGroup({
    firstName: new FormControl(this.userService.getUserData().firstName, [Validators.required, Validators.maxLength(50),this.customvalidator.onlyLetters()]),
    lastName: new FormControl(this.userService.getUserData().lastName, [Validators.required, Validators.maxLength(50),this.customvalidator.onlyLetters()]),
    phone: new FormControl(this.userService.getUserData().phone, [Validators.required,Validators.pattern('[+0-9]+'),Validators.minLength(7)]),
    email: new FormControl(this.userService.getUserData().email, [Validators.required, Validators.email, this.customvalidator.existingEmailValidator()]),
    gender: new FormControl(this.userService.getUserData().gender, [Validators.required]),
    password: new FormControl(this.userService.getUserData().password, [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
    confirmPassword: new FormControl('',Validators.required),
  });
  ngOnInit() {
    this.settingsForm
      .get('confirmPassword')
      ?.setAsyncValidators(this.passwordMatchValidator.bind(this));

    this.settingsForm
      .get('password')
      ?.valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(() => {
        this.settingsForm.get('confirmPassword')?.updateValueAndValidity({
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
    const password = this.settingsForm.get('password')?.value;
    const confirmPassword = control.value;

    this.passwordsMatch = password === confirmPassword;
    return of(this.passwordsMatch ? null : { mismatch: true }).pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    );
  }
  onSubmit() {
    if (this.settingsForm.valid) {
      let user = this.userService.getUserData();
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
