import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthApiModule } from 'src/app/auth-api/auth-api.module';
import { LoginSuccess, Logout } from 'src/app/auth-api/auth.actions';
import { SuccessfulLogin } from 'src/app/auth-api/successful-login';
import { Address } from 'src/app/core/address';
import { environment } from 'src/environments/environment';

const INVALID_SUCCESSFUL_LOGIN_DATA: string = 'invalid successful login data';
const INVALID_CREDENTIALS: string = 'invalid credentials';
const SERVER_ERROR: string = 'server error';

const LOGIN_ENDPOINT: string = '/api/Authentication/login';
const REGISTER_CREATING_ORG_ENDPOINT: string =
  '/api/Authentication/register-creating-org';
const REGISTER_JOINING_ORG_ENDPOINT: string =
  '/api/Authentication/sign-up-joining-org';

@Injectable({
  providedIn: AuthApiModule,
})
export class AuthService {
  private _isAuthenticated: boolean = false;

  public constructor(
    private _client: HttpClient,
    private _store: Store,
  ) {
    this._store
      .select((state) => {
        this._isAuthenticated = state.auth.access_token.length > 0;
      })
      .subscribe();
  }

  public login(email: string, password: string): Observable<SuccessfulLogin> {
    return new Observable((observer) => {
      let loginSubscription = this._client
        .post(
          environment.apiUrl + LOGIN_ENDPOINT,
          JSON.stringify({
            email: email,
            password: password,
          }),
          {
            headers: {
              'content-type': 'application/json',
            },
            observe: 'response',
            responseType: 'json',
          },
        )
        .subscribe({
          next: (value) => {
            if (value.ok) {
              let successfulLogin = value.body as SuccessfulLogin;

              if (successfulLogin) {
                observer.next(successfulLogin);
              } else {
                observer.error($localize`An error happened.`);
              }
            } else {
              observer.error($localize`An error occurred, please try again.`);
            }

            observer.complete();
          },
          error: (error) => {
            if (error.status == HttpStatusCode.Forbidden) {
              observer.error($localize`Invalid email or password.`);
            } else {
              observer.error(
                $localize`An unknown error occurred, please try again.`,
              );
            }

            observer.complete();
          },
        });

      return {
        unsubscribe() {
          loginSubscription.unsubscribe();
        },
      };
    });
  }

  public logout() {
    this._store.dispatch(new Logout());
  }

  public isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  public signUpCreatingOrganization(
    email: string,
    password: string,
    fullName: String,
    organizationName: string,
    organizationAddress: Address,
  ): Observable<SuccessfulLogin> {
    return new Observable((observer) => {
      let signUpSubscription = this._client
        .post(
          environment.apiUrl + REGISTER_CREATING_ORG_ENDPOINT,
          JSON.stringify({
            User: {
              Email: email,
              Password: password,
              FullName: fullName,
            },
            Org: {
              Name: organizationName,
              Address: organizationAddress,
              Permissions: [],
            },
          }),
          {
            headers: {
              'content-type': 'application/json',
            },
            observe: 'response',
            responseType: 'json',
          },
        )
        .subscribe({
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
          },
        });
    });
  }

  public signUpJoiningOrganization(
    email: string,
    password: string,
    invitationCode: string,
  ) {}
}
