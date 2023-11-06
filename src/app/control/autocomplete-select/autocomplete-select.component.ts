import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { DataPair } from './data-pair';

@Component({
  selector: 'app-autocomplete-select',
  templateUrl: './autocomplete-select.component.html',
  styleUrls: ['./autocomplete-select.component.css'],
})
export class AutocompleteSelectComponent implements OnInit, OnDestroy {
  public searchControl: FormControl<string | null> = new FormControl(null);
  @Input()
  public label: string = '';
  @Input()
  public values: DataPair[] = [];
  public filteredValues: Observable<DataPair[]> =
    this.searchControl.valueChanges.pipe(
      startWith(''),
      map((filterValue) => {
        if (!filterValue) {
          return this.values;
        }

        if (!filterValue.toLowerCase) {
          return this.values;
        }

        return this.values.filter((value) =>
          value.displayName.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }),
    );
  @Input()
  public control: FormControl<DataPair> = new FormControl();

  @Input()
  public required: boolean = false;

  private _searchControlSubscription: Subscription | null = null;

  public ngOnInit(): void {
    if (this.required) {
      this._searchControlSubscription = this.searchControl.valueChanges
        .pipe(
          map((a) => {
            this.control.updateValueAndValidity();
            this.searchControl.updateValueAndValidity();
          }),
        )
        .subscribe();

      this.searchControl.setValidators((control) => {
        if (!this.control.valid) {
          return { controlInvalid: true };
        }

        return null;
      });
    }
  }

  public ngOnDestroy() {
    if (this._searchControlSubscription != null) {
      this._searchControlSubscription.unsubscribe();
    }
  }

  public selectOption(event: MatAutocompleteSelectedEvent) {
    this.control.setValue(event.option.value);
    this.searchControl.setValue(null);
  }

  public deselectOption() {
    this.control.reset();
  }
}
