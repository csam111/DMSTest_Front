import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { User } from 'src/app/models/Public/UserRegister';
import { PublicService } from 'src/app/services/Account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private user: User = {
    Email:'',
    IdUsers : 0,
    Nombre : '',
    Password : ''
  }
  username: string = "";
  email: string = "";
  password: string = "";
  password2: string = "";

  constructor(
      private _apiRegister : PublicService
  ) { }

  onSubmit() {

    if(this.password === this.password2){

      this.user.Email = this.email;
      this.user.Nombre = this.username;
      this.user.Password = this.password;
      this.user.IdUsers = 0;

      this._apiRegister.RegistrationUser(this.user).subscribe(response => {
        console.log(response)
        if(response.success){
          Swal.fire({
            title: 'Ok',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        }
        else
        {
          Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
    else
    {
      Swal.fire({
        title: 'Alerta',
        text: 'Las contraseñas no coinciden',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }

  }
}
