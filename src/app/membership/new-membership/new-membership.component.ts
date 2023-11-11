import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataPair } from '../../control/autocomplete-select/data-pair';
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { AutocompleteSelectCountryProviderService } from '../../control/autocomplete-select/autocomplete-select-country-provider.service';
import { Store } from '@ngxs/store';
import { Address } from '../../core/address';
import { CreateOrgPayload } from '../../auth-api/create-org-payload';
import { RegisterJoiningOrgPayload } from '../../auth-api/register-joining-org-payload';
import { MembershipService } from '../../membership-api/membership.service';
import { OrgService } from '../../org-api/org.service';
import { RoutingService } from '../../routing/routing.service';
import {UserCreateOrgPayload} from "../../membership-api/user-create-org-payload";
import {AuthService} from "../../auth-api/auth.service";

@Component({
  selector: 'app-new-membership',
  templateUrl: './new-membership.component.html',
  styleUrls: ['./new-membership.component.css'],
})
export class NewMembershipComponent {
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
    private _membershipService: MembershipService,
    private _authService: AuthService,
    private _routingService: RoutingService,
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

  public onSubmitClick() {
    this.error = '';

    this.orgName.markAsTouched();
    this.orgAddressCountry.markAsTouched();
    this.orgAddressProvince.markAsTouched();
    this.orgAddressCity.markAsTouched();
    this.orgAddressStreet.markAsTouched();
    this.orgAddressNumber.markAsTouched();
    this.orgAddressAdditional.markAsTouched();
    this.orgAddressPostalCode.markAsTouched();
    this.invitationCode.markAsTouched();

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
      this.createOrg();
    } else {
      this.joinOrg();
    }
  }

  private createOrg() {
    const name: string = this.orgName.value;
    const address: Address = {
      Country: this.orgAddressCountry.value?.value,
      Province: this.orgAddressProvince.value,
      City: this.orgAddressCity.value,
      Street: this.orgAddressStreet.value,
      Number: this.orgAddressNumber.value,
      Additional: this.orgAddressAdditional.value,
      PostalCode: this.orgAddressPostalCode.value,
    };

    const org: CreateOrgPayload = {
      Name: name,
      Address: address,
      Permissions: [],
    };

    const userId = this._authService.getUserId();

    if (!userId) {
      this.error = $localize`Must be authenticated in order to create an organization.`;
      return;
    }

    const userCreateOrgPayload: UserCreateOrgPayload = {
      UserId: userId,
      Org: org,
    };

    this._membershipService.userCreateOrg(userCreateOrgPayload).subscribe({
      next: (value: any) => {
        this.error = '';
        this.loading = false;
        this._routingService.goToHome();
        this._membershipService.readAllMemberships(userId).subscribe();
      },
      error: (error: any) => {
        this.loading = false;
        this.error = error;
      },
    });
  }

  private joinOrg() {
    let invitationCode: string = this.invitationCode.value;

    let payload: RegisterJoiningOrgPayload = {
      InvitationCode: invitationCode,
    };

    this.loading = false;
  }
}
