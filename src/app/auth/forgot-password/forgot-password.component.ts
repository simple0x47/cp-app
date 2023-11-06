import { Component } from '@angular/core';
import { AuthService } from '../../auth-api/auth.service';
import { ForgotPasswordPayload } from '../../auth-api/forgot-password-payload';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  public email: FormControl<string> = new FormControl();

  public loading: boolean = false;
  public success: boolean = false;
  public error: string = '';

  public constructor(public authService: AuthService) {}

  public onSendRequestClick() {
    this.error = '';
    this.loading = true;

    let payload: ForgotPasswordPayload = {
      Email: this.email.value,
    };

    this.authService.forgotPassword(payload).subscribe({
      next: (value) => {
        this.loading = false;
        this.success = true;
      },
      error: (error) => {
        this.loading = false;
        this.error = error;
      },
    });
  }
}
