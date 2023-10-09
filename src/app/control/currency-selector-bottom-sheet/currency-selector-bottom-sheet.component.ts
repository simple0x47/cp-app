import {Component, ElementRef, ViewChild} from '@angular/core';
import {CurrencyCode} from './currency-code';
import {first, Observable} from 'rxjs';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-currency-selector-bottom-sheet',
  templateUrl: './currency-selector-bottom-sheet.component.html',
  styleUrls: ['./currency-selector-bottom-sheet.component.css']
})
export class CurrencySelectorBottomSheetComponent {
  public searchControl: FormControl<string | null> = new FormControl(null);
  private _currencyCodes$: Observable<string[]> = new Observable(observer => {
    observer.next(this.currencyCodes());
    observer.complete();

    return {
      unsubscribe() {

      },
    }
  });
  public filteredCurrencyCodes$: Observable<string[]> = new Observable(observer => {
    let sourceCurrencyCodes: string[] = [];

    const currencyCodesSubscription = this._currencyCodes$.subscribe(currencyCodes => {
      sourceCurrencyCodes = currencyCodes;
      const filterValue = this.searchControl.value?.toLowerCase() || "";

      observer.next(sourceCurrencyCodes.filter(currencyCode => {
        return currencyCode.toLowerCase().includes(filterValue);
      }));
    });

    const searchInputSubscription = this.searchControl.valueChanges.subscribe(value => {
      const filterValue = value?.toLowerCase() || "";

      observer.next(sourceCurrencyCodes.filter(currencyCode => {
        return currencyCode.toLowerCase().includes(filterValue);
      }));
    });

    return {
      unsubscribe() {
        currencyCodesSubscription.unsubscribe();
        searchInputSubscription.unsubscribe();
      }
    }
  });

  @ViewChild('searchInput')
  private _searchInput: ElementRef | null = null;

  public constructor(
    private _bottomSheetRef: MatBottomSheetRef<CurrencySelectorBottomSheetComponent>
  ) {
    _bottomSheetRef.afterOpened().pipe(first()).subscribe(() => {
      if (!this._searchInput) {
        return;
      }


      if (!this._searchInput.nativeElement.focus) {
        return;
      }

      this._searchInput.nativeElement.focus();
    });
  }

  public selectCurrency(currency: string) {
    this._bottomSheetRef.dismiss(currency);
  }

  private currencyCodes(): string[] {
    const currencies: string[] = [];

    for (const currency of Object.keys(CurrencyCode).filter(item => {
      return isNaN(Number(item));
    })) {
      currencies.push(currency);
    }

    return currencies;
  }
}
