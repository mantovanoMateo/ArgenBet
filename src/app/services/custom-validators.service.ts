import { Injectable } from '@angular/core';
import { AbstractControl,ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  onlyLetters(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      console.log('Control value:', control.value);
      const valid = /^[a-zA-Z]+$/.test(control.value);
      console.log('Is valid:', valid);
      return valid ? null : { 'onlyLetters': { value: control.value } };
    };
  }
}
