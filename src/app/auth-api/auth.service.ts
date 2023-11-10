import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { first, Observable } from 'rxjs';
import { SuccessfulLogin } from 'src/app/auth-api/successful-login';
import { environment } from 'src/environments/environment';
import { LoginPayload } from './login-payload';
import { LoginSuccess, Logout } from './auth.actions';
import { RegisterCreatingOrgPayload } from './register-creating-org-payload';
import { RegisterJoiningOrgPayload } from './register-joining-org-payload';
import { AuthApiModule } from './auth-api.module';
import {
  INVALID_GRANT,
  INVALID_SIGNUP,
  TOO_MANY_ATTEMPTS,
} from './error-codes';
import { ForgotPasswordPayload } from './forgot-password-payload';
import { MembershipService } from '../membership-api/membership.service';
import { RefreshTokenPayload } from './refresh-token-payload';

const LOGIN_ENDPOINT: string = '/api/Authentication/login';
const REGISTER_CREATING_ORG_ENDPOINT: string =
  '/api/Authentication/register-creating-org';
const REGISTER_JOINING_ORG_ENDPOINT: string =
  '/api/Authentication/sign-up-joining-org';
const FORGOT_PASSWORD_ENDPOINT: string = '/api/Authentication/forgot-password';
const REFRESH_TOKEN_ENDPOINT: string = '/api/Authentication/refresh-token';

@Injectable({
  providedIn: AuthApiModule,
})
export class AuthService {
  private _isAuthenticated: boolean;

  public constructor(
    private _client: HttpClient,
    private _store: Store,
    private _membershipService: MembershipService,
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

  public forgotPassword(payload: ForgotPasswordPayload): Observable<null> {
    return new Observable<null>((observer) => {
      let endpointSubscription = this._client
        .post(
          environment.apiUrl + FORGOT_PASSWORD_ENDPOINT,
          JSON.stringify(payload),
          {
            headers: {
              'content-type': 'application/json',
            },
            observe: 'response',
          },
        )
        .subscribe({
          next: (response) => {
            if (response.status != HttpStatusCode.NoContent) {
              observer.error($localize`An unexpected error happened.`);
              return;
            }

            observer.next(null);
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          },
        });

      return {
        unsubscribe() {
          endpointSubscription.unsubscribe();
        },
      };
    });
  }

  public refreshToken(refreshToken: string): Observable<SuccessfulLogin> {
    const payload: RefreshTokenPayload = {
      RefreshToken: refreshToken,
    };

    return this.commonLogin(
      environment.apiUrl + REFRESH_TOKEN_ENDPOINT,
      JSON.stringify(payload),
    );
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

                let userId: string = this._store.selectSnapshot(
                  (state) => state.auth.UserId,
                );

                if (userId) {
                  this._membershipService
                    .readAllMemberships(userId)
                    .pipe(first())
                    .subscribe();
                }

                console.log('login success');
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
            } else if (error.error == INVALID_SIGNUP) {
              observer.error($localize`Email already registered.`);
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
