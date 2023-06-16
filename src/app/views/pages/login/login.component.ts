import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from 'src/app/services/Account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(
      private _router : Router,
      private _apiAuth : PublicService
    ){

  }

  ngOnInit(){
    localStorage.clear();
  }

  onSubmit() {

    this._apiAuth.AuthenticationUser(this.username, this.password).subscribe(
      response => {
        if (response.success === 1) {
          this._router.navigate(['ListUsers']);
        } else {
          Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error => {
        // Aquí manejas el HttpErrorResponse
        console.log('Error de API:', error);
        // Puedes mostrar un mensaje de error personalizado al usuario
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );

  }

  formRegister(){
    this._router.navigate(['/Register']);
  }

}
