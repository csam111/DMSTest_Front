import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/Public/UserRegister';
import { PublicService } from 'src/app/services/Account.service';
import { AdministrationService } from 'src/app/services/Administration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-account',
  templateUrl: 'my-account.component.html',
  styleUrls: ['my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  isEmailInvalid: boolean = false;
  customValidated = false;

  private user: User = {
    Email:'',
    IdUsers : 0,
    Nombre : '',
    Password : ''
  }
  username: string = "";
  idUsers : number = 0;
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  passwordMatch: boolean = true;

  constructor(
    private _apiAdministration : AdministrationService,
    private _router : Router
  ) { }

  ngOnInit(){
    this.getPersonalData();
  }

  getPersonalData(){
    this._apiAdministration.GetPersonalData().subscribe(response => {
      this.username = response.data.nombre;
      this.email = response.data.email;
      this.idUsers = response.data.idUsers;
    });
  }


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
    this.user.IdUsers = this.idUsers;

    this._apiAdministration.UpdatePersonData(this.user).subscribe(response => {
      if (response.success) {
        Swal.fire({
          title: 'Ok',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this._router.navigate(['/ListUsers']);
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

  validatePassword(password: string): boolean {

    const minLength = 8;
    const specialChars = /[$@$!%*?&]/;

    if (password.length < minLength || !specialChars.test(password)) {
      return false;
    }

    return true;
  }

}
