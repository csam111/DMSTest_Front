import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PublicService } from "../services/Account.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authUser: PublicService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authUser.userData;
    const token = localStorage.getItem('Token');

    if (user && !this.authUser.isTokenExpired()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      this.router.navigate(['Login']);
    }

    return next.handle(req);
  }
}
