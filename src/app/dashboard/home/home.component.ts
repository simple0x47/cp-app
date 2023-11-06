import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthStateModel } from 'src/app/auth-api/auth.state';
import { AuthService } from 'src/app/auth-api/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public user$: Observable<AuthStateModel>;

  public constructor(
    public authService: AuthService,
    private _store: Store,
  ) {
    this.user$ = this._store.select((state) => {
      return state.auth;
    });
  }

  public onClickLogout() {
    this.authService.logout();
  }
}
