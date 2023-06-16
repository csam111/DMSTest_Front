import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  username: string = "";
  email: string = "";
  password: string = "";
  password2: string = "";



  constructor() { }

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Password2:', this.password2);
  }

}
