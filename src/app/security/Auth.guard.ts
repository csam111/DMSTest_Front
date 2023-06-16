import { Injectable, inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PublicService } from '../services/Account.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const router: Router = inject(Router);
  const apiAuth: PublicService = inject(PublicService);
  const user = apiAuth.userData;

  if (user == null) {
    return router.navigate(['Login']);
  }
  else
    return true;

}
