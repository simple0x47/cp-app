import { Component } from '@angular/core';
import {AuthService} from "../../auth-api/auth.service";
import {Router} from "@angular/router";
import {RoutingService} from "../../routing/routing.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  public constructor(
    private _authService: AuthService,
    private _routingService: RoutingService
  ) {
  }

  public logout() {
    this._authService.logout();
    this._routingService.goToLogin();
  }
}
