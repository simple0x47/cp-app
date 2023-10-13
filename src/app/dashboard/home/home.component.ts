import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState, AuthStateModel } from 'src/app/auth-api/auth-state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public user$: Observable<AuthStateModel>;

  public constructor(private _store: Store) {
    this.user$ = this._store.select(state => {
      return state.auth;
    });
  }
}
