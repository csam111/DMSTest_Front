import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/models/Public/AuthRequest';
import { PublicService } from 'src/app/services/Account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: AuthRequest = {
    User: "",
    Password: ""
  };
  public userName : string = '';
  public password : string = '';

  constructor(
    public apiAuth: PublicService,
    private _router: Router
    ){
      console.log(this.apiAuth.userData)
      if(this.apiAuth.userData != null){
        //this._router.navigate(['/Private/list-users'])
      }
  }

  ngOnInit(): void {
    //localStorage.clear();
  }

  login(): void {
    this.user.User = this.userName;
    this.user.Password = this.password;

    this.apiAuth.AuthenticationUser(this.user.User, this.user.Password).subscribe(response => {
      if( response.success === 1){
        this._router.navigate(['/Private/list-users']);
      }
    });
  }

}

