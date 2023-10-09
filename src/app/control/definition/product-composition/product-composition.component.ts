import {AfterViewInit, Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DefinitionService} from "../../../api/definition-api/definition.service";
import {ProductCompositionDialogComponent} from './product-composition-dialog/product-composition-dialog.component';
import {ProductCompositionModel} from './product-composition-model';
import {AbstractControl} from '@angular/forms';
import {Attribute} from "../../../core/definition/attribute";

@Component({
  selector: 'app-product-composition',
  templateUrl: './product-composition.component.html',
  styleUrls: ['./product-composition.component.css']
})
export class ProductCompositionComponent implements AfterViewInit {

  @Input()
  public attribute: Attribute = new Attribute("", "", "", false);

  @Input()
  public attributeId: string = "";

  @Input()
  public required: boolean = false;

  @Input()
  public formValidated: boolean = false;

  public control: AbstractControl<ProductCompositionModel[] | null> | null = null;
  public composition: ProductCompositionModel[] = [];

  private _convertableFrom: any = null;

  public constructor(
    private _dialog: MatDialog,
    private _definition: DefinitionService
  ) {

  }

  public openCreateProductSupplyDialog() {
    const dialogReference = this._dialog.open(ProductCompositionDialogComponent,
      {
        data: {
          categories$: this._definition.suppliableProducts$,
          filterByIds: this._convertableFrom
        },
        minWidth: '360px',
      });

    dialogReference.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.composition.push(result);
      this.control?.setValue(this.composition);
    });
  }

  public removeProduct(product: ProductCompositionModel) {
    let index = -1;
    for (let i = 0; i < this.composition.length; i++) {
      if (this.composition[i] === product) {
        index = i;
        break;
      }
    }

    if (index < 0) {
      return;
    }

    const lastIndex = this.composition.length - 1;
    [this.composition[index], this.composition[lastIndex]] = [this.composition[lastIndex], this.composition[index]];
    this.composition.pop();

    if (this.composition.length === 0) {
      this.control?.setValue(null);
    } else {
      this.control?.setValue(this.composition);
    }
  }

  public ngAfterViewInit(): void {
    const result = this.attribute.dataType.replace("comp#", "");
    this._convertableFrom = result.split(",");
  }
}
