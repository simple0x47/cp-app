import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { AuthService } from 'src/app/auth-api/auth.service';
import { AutocompleteSelectCountryProviderService } from 'src/app/control/autocomplete-select/autocomplete-select-country-provider.service';
import { Address } from 'src/app/core/address';
import { LoginSuccess } from '../../auth-api/auth.actions';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  public email: FormControl<string> = new FormControl();
  public password: FormControl<string> = new FormControl();
  public fullName: FormControl<string> = new FormControl();

  public orgName: FormControl<string> = new FormControl();
  public orgAddressCountry: FormControl<string> = new FormControl();
  public orgAddressProvince: FormControl<string> = new FormControl();
  public orgAddressCity: FormControl<string> = new FormControl();
  public orgAddressStreet: FormControl<string> = new FormControl();
  public orgAddressNumber: FormControl<string> = new FormControl();
  public orgAddressAdditional: FormControl<string> = new FormControl();
  public orgAddressPostalCode: FormControl<string> = new FormControl();

  public invitationCode: FormControl<string> = new FormControl();

  @ViewChild(MatRadioGroup)
  public createOrJoinOrganization: MatRadioGroup | null = null;
  public createOrJoinMode = 0;

  public countries: AutocompleteSelectCountryProviderService =
    new AutocompleteSelectCountryProviderService();

  public errorId: string = '';

  public constructor(
    private _authService: AuthService,
    private _store: Store,
    private _router: Router,
  ) {}

  public onOrganizationModeChange(event: MatRadioChange) {
    this.createOrJoinMode = event.value;

    if (event.value == 1) {
      this.orgAddressCountry.clearValidators();
      this.orgAddressCountry.addValidators(Validators.required);

      this.orgAddressProvince.clearValidators();
      this.orgAddressProvince.addValidators(Validators.required);

      this.orgAddressCity.clearValidators();
      this.orgAddressCity.addValidators(Validators.required);

      this.orgAddressStreet.clearValidators();
      this.orgAddressStreet.addValidators(Validators.required);

      this.orgAddressNumber.clearValidators();
      this.orgAddressNumber.addValidators(Validators.required);

      this.orgAddressPostalCode.clearValidators();
      this.orgAddressPostalCode.addValidators(Validators.required);

      this.invitationCode.clearValidators();
    } else {
      this.orgAddressCountry.clearValidators();

      this.orgAddressProvince.clearValidators();

      this.orgAddressCity.clearValidators();

      this.orgAddressStreet.clearValidators();

      this.orgAddressNumber.clearValidators();

      this.orgAddressPostalCode.clearValidators();

      this.invitationCode.clearValidators();
      this.invitationCode.addValidators(Validators.required);
    }
  }

  public onSignUpClick() {
    this.email.markAsTouched();
    this.password.markAsTouched();
    this.orgName.markAsTouched();
    this.orgAddressCountry.markAsTouched();
    this.orgAddressProvince.markAsTouched();
    this.orgAddressCity.markAsTouched();
    this.orgAddressStreet.markAsTouched();
    this.orgAddressNumber.markAsTouched();
    this.orgAddressAdditional.markAsTouched();
    this.orgAddressPostalCode.markAsTouched();
    this.invitationCode.markAsTouched();

    if (!this.email.valid || !this.password.valid) {
      return;
    }

    if (this.createOrJoinMode != 1 && this.createOrJoinMode != 2) {
      return;
    }

    if (
      this.createOrJoinMode == 1 &&
      (!this.orgName.valid ||
        !this.orgAddressAdditional.valid ||
        !this.orgAddressProvince.valid ||
        !this.orgAddressCity.valid ||
        !this.orgAddressStreet.valid ||
        !this.orgAddressPostalCode.valid)
    ) {
      return;
    }

    if (this.createOrJoinMode == 2 && !this.invitationCode.valid) {
      return;
    }

    if (this.createOrJoinMode == 1) {
      this.signUpCreatingOrganization();
    } else {
      this.signUpJoiningOrganization();
    }
  }

  private signUpCreatingOrganization() {
    let email: string = this.email.value;
    let password: string = this.password.value;
    let fullName: string = this.fullName.value;
    let name: string = this.orgName.value;
    let address: Address = {
      country: this.orgAddressCountry.value,
      province: this.orgAddressProvince.value,
      city: this.orgAddressCity.value,
      street: this.orgAddressStreet.value,
      number: this.orgAddressNumber.value,
      additional: this.orgAddressAdditional.value,
      postal_code: this.orgAddressPostalCode.value,
    };

    this._authService
      .signUpCreatingOrganization(email, password, fullName, name, address)
      .subscribe({
        next: (value) => {
          this._store.dispatch(new LoginSuccess(value));
          this.errorId = '';

          this.navigateToHome();
        },
        error: (error) => {
          this.errorId = error;
        },
      });
  }

  private navigateToHome() {
    this._router.navigateByUrl('/');
  }

  private signUpJoiningOrganization() {
    let email: string = this.email.value;
    let password: string = this.password.value;
    let invitationCode: string = this.invitationCode.value;

    this._authService.signUpJoiningOrganization(
      email,
      password,
      invitationCode,
    );
  }
}
