import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginPayload } from '../../auth-api/login-payload';
import { AuthService } from '../../auth-api/auth.service';
import { RoutingService } from '../../routing/routing.service';

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
    private _routingService: RoutingService,
    private _authService: AuthService,
  ) {
    this.email.addValidators(Validators.required);
    this.password.addValidators(Validators.required);

    if (_authService.isAuthenticated()) {
      this._routingService.goToHome();
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
        this._routingService.goToHome();
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
}
