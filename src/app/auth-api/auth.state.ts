import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { LoginSuccess, Logout } from 'src/app/auth-api/auth.actions';
import { decodeJwt } from 'jose';

export interface AuthStateModel {
  UserId: string;
  AccessToken: string;
  RefreshToken: string;
  IdToken: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    UserId: '',
    AccessToken: '',
    RefreshToken: '',
    IdToken: '',
  },
})
@Injectable()
export class AuthState {
  @Action(LoginSuccess)
  login(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    let payload = decodeJwt(action.successfulLogin.AccessToken);

    ctx.setState({
      UserId: payload.sub || '',
      AccessToken: action.successfulLogin.AccessToken,
      RefreshToken: action.successfulLogin.RefreshToken,
      IdToken: action.successfulLogin.IdToken,
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>, action: Logout) {
    ctx.setState({
      UserId: '',
      AccessToken: '',
      RefreshToken: '',
      IdToken: '',
    });
  }
}
