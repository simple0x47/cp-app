import { SuccessfulLogin } from 'src/app/auth-api/successful-login';

export class LoginSuccess {
  static readonly type = '[Auth] Login success';

  constructor(public successfulLogin: SuccessfulLogin) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
