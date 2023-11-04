import { SuccessfulLogin } from 'src/app/auth-api/successful-login';

export class Login {
  static readonly type = '[Auth] Login';

  constructor(
    public email: string,
    public password: string,
  ) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
