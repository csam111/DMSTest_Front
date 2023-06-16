import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Response } from '../models/Response'
import { AuthRequest } from '../models/Public/AuthRequest';
import { User } from '../models/Private/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  url: string = 'https://localhost:7208';

  private userSubject : BehaviorSubject<User>

  public get userData(): User {
    return this.userSubject.value;
  }

  constructor(private _http: HttpClient) {
    const storedUser = localStorage.getItem('User');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    this.userSubject = new BehaviorSubject<User>(initialUser);
  }



  AuthenticationUser(User: string, Password: string): Observable<Response> {

    return this._http.post<Response>(this.url + 'Login', {User,Password}, httpOptions)
    .pipe(
      map(res => {
        if(res.success === 1){
          const user: User = res.data;
          localStorage.setItem('User',JSON.stringify(user));
          this.userSubject?.next(user);
        }
        return res;
      })
    );
  }

}
