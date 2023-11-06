import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SuccessfulLogin } from 'src/app/auth-api/successful-login';
import { environment } from 'src/environments/environment';
import { LoginPayload } from './login-payload';
import { LoginSuccess, Logout } from './auth.actions';
import { RegisterCreatingOrgPayload } from './register-creating-org-payload';
import { RegisterJoiningOrgPayload } from './register-joining-org-payload';
import { AuthApiModule } from './auth-api.module';
import { INVALID_GRANT, TOO_MANY_ATTEMPTS } from './error-codes';

const LOGIN_ENDPOINT: string = '/api/Authentication/login';
const REGISTER_CREATING_ORG_ENDPOINT: string =
  '/api/Authentication/register-creating-org';
const REGISTER_JOINING_ORG_ENDPOINT: string =
  '/api/Authentication/sign-up-joining-org';

@Injectable({
  providedIn: AuthApiModule,
})
export class AuthService {
  private _isAuthenticated: boolean;

  public constructor(
    private _client: HttpClient,
    private _store: Store,
  ) {
    this._isAuthenticated = !!_store.selectSnapshot(
      (state) => state.auth.AccessToken,
    );
  }

  public login(payload: LoginPayload): Observable<SuccessfulLogin> {
    return this.commonLogin(
      environment.apiUrl + LOGIN_ENDPOINT,
      JSON.stringify(payload),
    );
  }

  public logout() {
    this._isAuthenticated = false;
    this._store.dispatch(new Logout());
  }

  public registerCreatingOrg(
    payload: RegisterCreatingOrgPayload,
  ): Observable<SuccessfulLogin> {
    return this.commonLogin(
      environment.apiUrl + REGISTER_CREATING_ORG_ENDPOINT,
      JSON.stringify(payload),
    );
  }

  public registerJoiningOrg(
    payload: RegisterJoiningOrgPayload,
  ): Observable<SuccessfulLogin> {
    return this.commonLogin(
      environment.apiUrl + REGISTER_JOINING_ORG_ENDPOINT,
      JSON.stringify(payload),
    );
  }

  public isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  private commonLogin(
    endpoint: string,
    jsonPayload: string,
  ): Observable<SuccessfulLogin> {
    return new Observable((observer) => {
      let endpointSubscription = this._client
        .post(endpoint, jsonPayload, {
          headers: {
            'content-type': 'application/json',
          },
          observe: 'response',
          responseType: 'json',
        })
        .subscribe({
          next: (value) => {
            if (value.ok) {
              let successfulLogin = value.body as SuccessfulLogin;

              if (successfulLogin) {
                this._isAuthenticated = true;
                observer.next(successfulLogin);
                this._store.dispatch(new LoginSuccess(successfulLogin));
                return;
              }

              observer.error($localize`An error happened.`);
              return;
            }

            observer.error($localize`An error occurred, please try again.`);
          },
          error: (error) => {
            console.log(JSON.stringify(error));
            if (error.error == TOO_MANY_ATTEMPTS) {
              observer.error(
                $localize`Too many attempts. Your account has been locked. Check your email for instructions about how to unlock it.`,
              );
            } else if (error.error == INVALID_GRANT) {
              observer.error($localize`Invalid email or password.`);
            } else {
              observer.error(
                $localize`An unknown error occurred, please try again.`,
              );
            }
          },
        });

      return {
        unsubscribe() {
          endpointSubscription.unsubscribe();
        },
      };
    });
  }
}
