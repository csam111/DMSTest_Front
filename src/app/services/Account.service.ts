import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Response } from 'src/app/models/Response'
import { AuthRequest } from '../models/Public/AuthRequest';
import { User } from 'src/app/models/Public/UserRegister';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8 '
  })
};


@Injectable({
  providedIn: 'root'
})
export class PublicService {

  url: string = 'https://localhost:7208/api';

  private userSubject : BehaviorSubject<User>

  public get userData(): User {
    return this.userSubject.value;
  }

  constructor(private _http: HttpClient) {
    const storedUser = localStorage.getItem('User');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    this.userSubject = new BehaviorSubject<User>(initialUser);
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('Token');
    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);
      return tokenExpiration < new Date();
    }
    return true;
  }

  private getTokenExpiration(token: string): Date {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(tokenPayload.exp);
    return expirationDate;
  }


  AuthenticationUser(User: string, Password: string): Observable<Response> {
    return this._http.post<Response>(this.url + '/Account', { User, Password }, httpOptions)
      .pipe(
        map(res => {
          if (res.success === 1) {
            const user: User = res.data;
            localStorage.setItem('User', JSON.stringify(user));
            localStorage.setItem('Token', res.data.token);
            this.userSubject?.next(user);
          }
          return res;
        })
      );
  }


  public logout(): void {
    localStorage.clear();
    window.location.reload();
  }

  RegistrationUser(User: User): Observable<Response> {
    console.log(User)
    return this._http.post<Response>('https://localhost:7208/CreateUser', User);
  }



}
