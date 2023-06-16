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

  UpdateUser(user: User): Observable<Response> {
    return this._http.put<Response>('https://localhost:7208/UpdateUser', user);
  }

  DeleteUser(idUser: number): Observable<Response> {
    return this._http.delete<Response>(`https://localhost:7208/DeleteUser?idUser=${idUser}`);
  }

}
