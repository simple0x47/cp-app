import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { AutocompleteSelectCountryProviderService } from 'src/app/control/autocomplete-select/autocomplete-select-country-provider.service';
import { Address } from 'src/app/core/address';
import { Store } from '@ngxs/store';
import { RegisterUserPayload } from '../../auth-api/register-user-payload';
import { CreateOrgPayload } from '../../auth-api/create-org-payload';
import { AuthService } from '../../auth-api/auth.service';
import { DataPair } from '../../control/autocomplete-select/data-pair';
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
