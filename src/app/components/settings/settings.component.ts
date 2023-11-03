import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  profileForm = new FormGroup(
    {
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dni: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    nationality: new FormControl(''),
    birthdate: new FormControl(''),
    password: new FormControl('')
    
  });
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
