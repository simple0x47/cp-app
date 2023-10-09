import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
  AutocompleteSelectCountryProviderService
} from "../../../../autocomplete-select/autocomplete-select-country-provider.service";
import {DataPair} from "../../../../autocomplete-select/data-pair";
import {Entity} from "../../../../../api/entity-api/entity";
import {MatDialogRef} from "@angular/material/dialog";
import {EntityProviderService} from "../../../../../api/entity-api/entity-provider.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-new-entity',
  templateUrl: './add-new-entity.component.html',
  styleUrls: ['./add-new-entity.component.css']
})
export class AddNewEntityComponent {
  @Input()
  public entityName: string = "";

  public country: FormControl<DataPair | null> = new FormControl(null);
  public identification: FormControl<string | null> = new FormControl(null);
  public name: FormControl<string | null> = new FormControl(null);
  public address: FormControl<string | null> = new FormControl(null);
  public phone: FormControl<string | null> = new FormControl(null);
  public email: FormControl<string | null> = new FormControl(null);

  public formGroup: FormGroup = new FormGroup({
    country: this.country,
    identification: this.identification,
    name: this.name,
    address: this.address,
    phone: this.phone,
    email: this.email,
  });

  constructor(
    public autocompleteSelectCountryProviderService: AutocompleteSelectCountryProviderService,
    private _currentDialog: MatDialogRef<AddNewEntityComponent>,
    private _entityProvider: EntityProviderService,
    private _snackBar: MatSnackBar
  ) {

  }

  public addNewProducer() {
    this.formGroup.updateValueAndValidity();

    if (!this.formGroup.valid) {
      return;
    }

    let entity: Entity = new Entity();

    entity['country'] = this.country.value?.value;
    entity['identification'] = this.identification.value;
    entity['name'] = this.name.value;
    entity['address'] = this.address.value;
    entity['phone'] = this.phone.value;
    entity['email'] = this.email.value;

    let result = this._entityProvider.addNewEntity(entity);

    if (result.isError()) {
      this._snackBar.open($localize`Error, failed to add new ` + this.entityName.toLowerCase() + ".");
      return;
    }

    let resultEntity = result.unwrapOk();

    this._snackBar.open($localize`Successfully added new ` + this.entityName.toLowerCase() + ".");
    this._currentDialog.close(resultEntity);
  }
}
