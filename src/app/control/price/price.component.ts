import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {
  CurrencySelectorBottomSheetComponent
} from '../currency-selector-bottom-sheet/currency-selector-bottom-sheet.component';
import {first} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent {
  @Input()
  public label: string = "Price";

  @Input()
  public minimum: number = 0;

  @Input()
  public maximum: number = 1000000000;

  @Input()
  public control: FormControl<number | null> = new FormControl(null);
  public activeCurrency: string = "EUR";
  @ViewChild('priceInput')
  private _priceInput: ElementRef | null = null;

  public constructor(
    private _bottomSheet: MatBottomSheet
  ) {

  }

  public openCurrencySelector() {
    const bottomSheetRef = this._bottomSheet.open(CurrencySelectorBottomSheetComponent);

    bottomSheetRef.afterDismissed().pipe(first()).subscribe(result => {
      if (!result) {
        return;
      }

      if (!result.length) {
        return;
      }

      this.activeCurrency = result;

      if (!this._priceInput) {
        return;
      }

      if (!this._priceInput.nativeElement.focus) {
        return;
      }

      this._priceInput.nativeElement.focus();
    });
  }
}
