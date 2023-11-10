import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthStateModel } from 'src/app/auth-api/auth.state';
import { AuthService } from 'src/app/auth-api/auth.service';
import { MembershipService } from '../../membership-api/membership.service';
import { RoutingService } from '../../routing/routing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public user$: Observable<AuthStateModel>;

  public constructor(
    public authService: AuthService,
    private _membershipService: MembershipService,
    private _store: Store,
    private _routingService: RoutingService,
  ) {
    this.user$ = this._store.select((state) => {
      return state.auth;
    });
  }

  public onClickLogout() {
    this.authService.logout();
    this._routingService.goToLogin();
  }

  public onDoSomethingClick() {
    const refreshToken: string = this._store.selectSnapshot(
      (state) => state.auth.RefreshToken,
    );
    console.log('huh: ' + refreshToken);
    this.authService.refreshToken(refreshToken).subscribe();
  }
}
