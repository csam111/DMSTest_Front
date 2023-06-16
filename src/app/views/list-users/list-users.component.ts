import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../services/Administration.service'
import { User } from 'src/app/models/Public/UserRegister';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  templateUrl: 'list-users.component.html',
  styleUrls: ['list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  isPopupOpen = false;
  public listUser : any = [];
  public columns : string[] = ['Id','Nombres','Email','Acciones'];

  public user: User = {
    Email:'',
    IdUsers : 0,
    Nombre : '',
    Password : ''
  }

  idUser: number = 0;
  username: string = "";
  email: string = "";
  password: string = "";
  password2: string = "";

  constructor(
    private _apiAdministration: AdministrationService,
    private _modalService: NgbModal,
  ) { }

  ngOnInit(): void{
    this.getListUser();
  }

  getListUser(){
    this._apiAdministration.GetUserList().subscribe( response =>
      {
        this.listUser = [];
        this.listUser = response.data;
      })
  }

  EditUser(user:any){
    this.username = user.nombre;
    this.email = user.email;
    this.idUser = user.idUsers;
    this.isPopupOpen = true;
  }

  DeleteUser(user:any){
    console.log(user.idUsers)
    this._apiAdministration.DeleteUser(user.idUsers).subscribe(response => {
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

  closePopup(){
    this.isPopupOpen = false;
  }

  updateUser(){

    this.user.Email = this.email;
    this.user.Nombre = this.username;
    this.user.IdUsers = this.idUser;

    this._apiAdministration.UpdateUser(this.user).subscribe(response => {
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

}

