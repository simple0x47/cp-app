import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginSuccess } from 'src/app/auth-api/auth.actions';
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
    private _authService: AuthService,
    private _store: Store,
    private _router: Router
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

    this._authService.login(this.email.value, this.password.value).subscribe({
      next: value => {
        this._store.dispatch(new LoginSuccess(value));
        this.error_id = "";

        this._router.navigateByUrl("/");
      },
      error: error => {
        this.error_id = error;
      }
    });
  }

  public onInputChange() {
    this.error_id = "";
  }
}
