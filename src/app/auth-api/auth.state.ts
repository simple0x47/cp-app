import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Login, Logout } from 'src/app/auth-api/auth.actions';

export interface AuthStateModel {
  AccessToken: string;
  RefreshToken: string;
  IdToken: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    AccessToken: '',
    RefreshToken: '',
    IdToken: '',
  },
})
@Injectable()
export class AuthState {
  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {}

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>, action: Logout) {
    ctx.setState({
      AccessToken: '',
      RefreshToken: '',
      IdToken: '',
    });
  }
}
