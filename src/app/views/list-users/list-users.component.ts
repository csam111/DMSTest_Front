import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../../services/Administration.service'

@Component({
  templateUrl: 'list-users.component.html',
  styleUrls: ['list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  public listUser : any = [];
  public columns : string[] = ['Nombres','Apellidos','Usuario'];

  constructor(
    private _apiAdministration: AdministrationService
  ) { }

  ngOnInit(): void{
    this.getListUser();
  }

  getListUser(){
    this._apiAdministration.GetUserList().subscribe( response =>
      {
        const jsonObject = JSON.parse(response.data);
        this.listUser = jsonObject;
      })

  }
}
