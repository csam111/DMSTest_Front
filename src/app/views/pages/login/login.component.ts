import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = "";
  password: string = "";

  constructor(private _router : Router){

  }

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

  formRegister(){
    this._router.navigate(['/Register']);
  }

}
