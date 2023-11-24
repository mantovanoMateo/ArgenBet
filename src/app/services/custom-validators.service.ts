import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor(private userService: UserService) {}

  onlyLetters(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      //console.log('Control value:', control.value);
      const valid = /^[a-zA-Z\s]+$/.test(control.value);
      //console.log('Is valid:', valid);
      return valid ? null : { onlyLetters: { value: control.value } };
    };
  }
  dateOfBirthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = new Date();
      const selectedDate = new Date(control.value);
  
      // Verifica si la fecha de nacimiento es posterior a la fecha actual
      if (selectedDate > currentDate) {
        return { futureDate: true };
      }

      return null;
    };
  }
  Older18andyounger140Validator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = new Date();
      const selectedDate = new Date(control.value);
      const age = currentDate.getFullYear() - selectedDate.getFullYear();
  
      // Verifica que la edad esté entre 18 y 140 años
      if (age < 18 || age > 140) {
        return { invalidAge: true };
      }
  
      // Retorna null si la validación es exitosa
      return null;
    };}
    existingEmailValidator(): AsyncValidatorFn {
      return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return this.userService.getByEmail(control.value)
        .then(
          users => {
            return users ? { "emailExists": true } : null;
          }
        );
      };
    }
    existingDNIValidator(): AsyncValidatorFn {
      return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return this.userService.getByDni(control.value)
        .then(
          users => {
            return users ? { "dniExists": true } : null;
          }
        );
      };
    }
}
