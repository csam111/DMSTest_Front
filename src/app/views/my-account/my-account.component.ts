import { Component } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: 'my-account.component.html',
  styleUrls: ['my-account.component.scss']
})
export class MyAccountComponent {

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
