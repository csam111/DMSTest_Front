import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Response } from '../models/Response'
import { User } from 'src/app/models/Public/UserRegister';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  url: string = 'https://localhost:7208/';

  private userSubject : BehaviorSubject<User>

  public get userData(): User {
    return this.userSubject.value;
  }

  constructor(private _http: HttpClient) {
    const storedUser = localStorage.getItem('User');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    this.userSubject = new BehaviorSubject<User>(initialUser);
  }

  GetUserList(): Observable<Response> {

    return this._http.get<Response>(this.url + 'GetListUsers');

  }

  GetPersonalData(): Observable<Response> {
    return this._http.get<Response>(this.url + 'GetPersonalData');
  }

  UpdateUser(user: User): Observable<Response> {
    return this._http.put<Response>(this.url +'UpdateUser', user);
  }

  UpdatePersonData(user: User): Observable<Response> {
    return this._http.put<Response>(this.url + 'UpdatePersonalUser', user);
  }

  DeleteUser(idUser: number): Observable<Response> {
    return this._http.delete<Response>(this.url +`DeleteUser?idUser=${idUser}`);
  }

}
