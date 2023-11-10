import { Injectable } from '@angular/core';
import { RoutingModule } from './routing.module';
import { Router } from '@angular/router';

const LOGIN_ROUTE: string = '/login';
const HOME_ROUTE: string = '/';
const NEW_MEMBERSHIP_ROUTE: string = '/new-membership';

@Injectable({
  providedIn: RoutingModule,
})
export class RoutingService {
  constructor(private _router: Router) {}

  public goToLogin() {
    this._router.navigateByUrl(LOGIN_ROUTE);
  }

  public goToHome() {
    this._router.navigateByUrl(HOME_ROUTE);
  }

  public goToNewMembership() {
    this._router.navigateByUrl(NEW_MEMBERSHIP_ROUTE);
  }
}
