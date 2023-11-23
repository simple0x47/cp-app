import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegisterUserPayload } from '../../auth-api/register-user-payload';
import { AuthService } from '../../auth-api/auth.service';
import { RoutingService } from '../../routing/routing.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  public email: FormControl<string> = new FormControl();
  public password: FormControl<string> = new FormControl();
  public fullName: FormControl<string> = new FormControl();

  public error: string = '';
  public loading: boolean = false;

  public constructor(
    private _authService: AuthService,
    private _routingService: RoutingService,
  ) {}

  public onSignUpClick() {
    this.error = '';

    this.email.markAsTouched();
    this.password.markAsTouched();
    this.fullName.markAsTouched();

    if (!this.email.valid || !this.password.valid || !this.fullName.valid) {
      return;
    }

    this.loading = true;

    this.register();
  }

  private register() {
    let email: string = this.email.value;
    let password: string = this.password.value;
    let fullName: string = this.fullName.value;

    let payload: RegisterUserPayload = {
      Email: email,
      Password: password,
      FullName: fullName,
    };

    this._authService.register(payload).subscribe({
      next: (value) => {
        this.error = '';
        this.loading = false;
        this._routingService.goToHome();
      },
      error: (error) => {
        this.loading = false;
        this.error = error;
      },
    });
  }
}
