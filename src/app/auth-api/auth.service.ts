import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthApiModule } from 'src/app/auth-api/auth-api.module';
import { Logout } from 'src/app/auth-api/auth.actions';
import { SuccessfulLogin } from 'src/app/auth-api/successful-login';
import { environment } from 'src/environments/environment';

const INVALID_SUCCESSFUL_LOGIN_DATA: string = "invalid successful login data";
const INVALID_CREDENTIALS: string = "invalid credentials";
const SERVER_ERROR: string = "server error";

const API_GATEWAY_LOGIN_PATH: string = "/auth/login";

@Injectable({
  providedIn: AuthApiModule
})
export class AuthService {
  private _isAuthenticated: boolean = false;

  public constructor(
    private _client: HttpClient,
    private _store: Store
  ) {
    this._store.select(state => {
      this._isAuthenticated = state.auth.access_token.length > 0;
    }).subscribe();
  }

  public login(email: string, password: string): Observable<SuccessfulLogin> {
    return new Observable(observer => {
      let loginSubscription = this._client.post(environment.apiGatewayUrl + API_GATEWAY_LOGIN_PATH, JSON.stringify({
        email: email,
        password: password
      }), {
        headers: {
          "content-type": "application/json"
        },
        observe: "response",
        responseType: "json"
      }).subscribe({
        next: (value) => {
          if (value.ok) {
            let successfulLogin = value.body as SuccessfulLogin;

            if (successfulLogin) {
              observer.next(successfulLogin);
            } else {
              observer.error(INVALID_SUCCESSFUL_LOGIN_DATA);
            }
          } else {
            if (value.status == HttpStatusCode.BadRequest) {
              observer.error(INVALID_CREDENTIALS);
            } else {
              observer.error(SERVER_ERROR);
            }
          }

          observer.complete();
        },
        error: (error) => {
          observer.error(error.error);
          observer.complete();
        }
      });

      return {
        unsubscribe() {
          loginSubscription.unsubscribe();
        },
      }
    });
  }

  public logout() {
    this._store.dispatch(new Logout());
  }

  public isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
}
