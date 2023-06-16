import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/Public/UserRegister';
import { PublicService } from 'src/app/services/Account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isEmailInvalid: boolean = false;
  customValidated = false;

  private user: User = {
    Email:'',
    IdUsers : 0,
    Nombre : '',
    Password : ''
  }
  username: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  passwordMatch: boolean = true;

  constructor(
    private _apiRegister : PublicService,
    private _router : Router
  ) { }

  onReset1() {
    this.customValidated = false;
    this.passwordMatch = true;
  }
  onSubmit() {
    this.customValidated = true;

    if (this.password !== this.confirmPassword || !this.validatePassword(this.password) || !this.validatePassword(this.confirmPassword)) {
      this.passwordMatch = false;
      return;
    }

    this.passwordMatch = true;
    this.user.Email = this.email;
    this.user.Nombre = this.username;
    this.user.Password = this.password;
    this.user.IdUsers = 0;

    this._apiRegister.RegistrationUser(this.user).subscribe(response => {
      if (response.success) {
        Swal.fire({
          title: 'Ok',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this._router.navigate(['/Login']);
          }
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: response.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  validateEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {

    const minLength = 8;
    const specialChars = /[$@$!%*?&]/;

    if (password.length < minLength || !specialChars.test(password)) {
      return false;
    }

    return true;
  }
}
