import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPayload } from '../../auth-api/login-payload';
import { AuthService } from '../../auth-api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public email: FormControl<string> = new FormControl();
  public password: FormControl<string> = new FormControl();

  public error: string = '';
  public loading: boolean = false;

  public constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {
    this.email.addValidators(Validators.required);
    this.password.addValidators(Validators.required);

    if (_authService.isAuthenticated()) {
      this.navigateToHome();
    }
  }

  public onClickLogin() {
    this.error = '';
    this.email.markAsTouched();
    this.password.markAsTouched();

    if (!this.email.valid || !this.password.valid) {
      return;
    }

    let loginPayload: LoginPayload = {
      Email: this.email.value,
      Password: this.password.value,
    };

    this.loading = true;
    this._authService.login(loginPayload).subscribe({
      next: (value) => {
        this.error = '';

        this.loading = false;
        this.navigateToHome();
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }

  public onInputChange() {
    this.error = '';
  }

  private navigateToHome() {
    this._router.navigateByUrl('/');
  }
}
