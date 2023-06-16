import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PublicService } from "../services/Account.service";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

  constructor(
    private AuthUser : PublicService
    ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.AuthUser.userData;
    if(user){
      req = req.clone({
        setHeaders : {
          Authorization: `Bearer ${user.Token}`
        }
      });
    }
    return next.handle(req);
  }

}
