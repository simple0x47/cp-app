import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export const canActivateIsLoggedIn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  let isAuthenticated = inject(AuthService).isAuthenticated();

  if (!isAuthenticated) {
    inject(Router).navigateByUrl('/login');
    return false;
  }

  return true;
};

export const canActivateIsNotLoggedIn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return !inject(AuthService).isAuthenticated();
};
