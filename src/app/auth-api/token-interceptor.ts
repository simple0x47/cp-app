import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngxs/store';
import * as jose from 'jose';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public constructor(
    private _authService: AuthService,
    private _store: Store,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this.isTokenExpired()) {
      const refreshToken: string = this._store.selectSnapshot(
        (state) => state.auth.RefreshToken,
      );

      if (refreshToken == null) {
        console.warn('token has expired and refresh token is null');
        return next.handle(req);
      }

      this._authService.refreshToken(refreshToken).subscribe();
    }

    let accessToken: string = this._store.selectSnapshot(
      (state) => state.auth.AccessToken,
    );

    if (!accessToken) {
      return next.handle(req);
    }

    if (!req.headers.has('Authorization')) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
    }

    return next.handle(req);
  }

  private isTokenExpired(): boolean {
    const accessToken: string = this._store.selectSnapshot(
      (state) => state.auth.AccessToken,
    );

    if (!accessToken) {
      return false;
    }

    const decodedToken = jose.decodeJwt(accessToken);

    const expirationTimestamp = decodedToken.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (expirationTimestamp == undefined) {
      console.warn('missing "exp" from decoded token');
      return false;
    }

    return expirationTimestamp < currentTimestamp;
  }
}
