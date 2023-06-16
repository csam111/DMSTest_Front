import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from 'src/app/services/Account.service';

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

    this._apiAuth.AuthenticationUser(this.username, this.password).subscribe(response => {
      if( response.success === 1){
        this._router.navigate(['ListUsers']);
      }
    });
  }

  formRegister(){
    this._router.navigate(['/Register']);
  }

}
