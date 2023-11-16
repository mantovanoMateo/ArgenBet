import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor() {}

  onlyLetters(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      console.log('Control value:', control.value);
      const valid = /^[a-zA-Z]+$/.test(control.value);
      console.log('Is valid:', valid);
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
    
}
