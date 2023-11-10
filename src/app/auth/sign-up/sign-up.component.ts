import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { AutocompleteSelectCountryProviderService } from 'src/app/control/autocomplete-select/autocomplete-select-country-provider.service';
import { Address } from 'src/app/core/address';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { RegisterCreatingOrgPayload } from '../../auth-api/register-creating-org-payload';
import { RegisterUserPayload } from '../../auth-api/register-user-payload';
import { CreateOrgPayload } from '../../auth-api/create-org-payload';
import { RegisterJoiningOrgPayload } from '../../auth-api/register-joining-org-payload';
import { AuthService } from '../../auth-api/auth.service';
import { DataPair } from '../../control/autocomplete-select/data-pair';

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
  public orgAddressCountry: FormControl<DataPair> = new FormControl();
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

  public error: string = '';
  public loading: boolean = false;

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
    this.error = '';

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
        !this.orgAddressCountry.valid ||
        !this.orgAddressAdditional.valid ||
        !this.orgAddressProvince.valid ||
        !this.orgAddressCity.valid ||
        !this.orgAddressStreet.valid ||
        !this.orgAddressPostalCode.valid)
    ) {
      return;
    }

    if (this.orgAddressCountry.value == null) {
      this.error = $localize`You must select a country.`;
      return;
    }

    if (this.createOrJoinMode == 2 && !this.invitationCode.valid) {
      return;
    }

    this.loading = true;

    if (this.createOrJoinMode == 1) {
      this.registerCreatingOrg();
    } else {
      this.registerJoiningOrg();
    }
  }

  private registerCreatingOrg() {
    let email: string = this.email.value;
    let password: string = this.password.value;
    let fullName: string = this.fullName.value;
    let name: string = this.orgName.value;
    let address: Address = {
      Country: this.orgAddressCountry.value?.value,
      Province: this.orgAddressProvince.value,
      City: this.orgAddressCity.value,
      Street: this.orgAddressStreet.value,
      Number: this.orgAddressNumber.value,
      Additional: this.orgAddressAdditional.value,
      PostalCode: this.orgAddressPostalCode.value,
    };

    let user: RegisterUserPayload = {
      Email: email,
      Password: password,
      FullName: fullName,
    };

    let org: CreateOrgPayload = {
      Name: name,
      Address: address,
      Permissions: [],
    };

    let payload: RegisterCreatingOrgPayload = {
      User: user,
      Org: org,
    };

    this._authService.registerCreatingOrg(payload).subscribe({
      next: (value) => {
        this.error = '';
        this.loading = false;
        this.navigateToHome();
      },
      error: (error) => {
        this.loading = false;
        this.error = error;
      },
    });
  }

  private navigateToHome() {
    this._router.navigateByUrl('/');
  }

  private registerJoiningOrg() {
    let email: string = this.email.value;
    let password: string = this.password.value;
    let fullName: string = this.fullName.value;
    let invitationCode: string = this.invitationCode.value;

    let user: RegisterUserPayload = {
      Email: email,
      Password: password,
      FullName: fullName,
    };

    let payload: RegisterJoiningOrgPayload = {
      User: user,
      InvitationCode: invitationCode,
    };

    this.loading = false;
    this._authService.registerJoiningOrg(payload);
  }
}
