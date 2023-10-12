import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth-api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email: FormControl<string> = new FormControl();
  public password: FormControl<string> = new FormControl();

  public error_id: string = "";

  public constructor(
    private _authService: AuthService
  ) {
    this.email.addValidators(Validators.required);
    this.password.addValidators(Validators.required);
  }

  public onClickLogin() {
    this.email.markAsTouched();
    this.password.markAsTouched();

    if ((!this.email.valid) || (!this.password.valid)) {
      return;
    }

    this._authService.login(this.email.value, this.password.value).subscribe(value => {
      if (value.isOk()) {

      } else {

      }
    });
  }
}
