import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, Observable, startWith} from 'rxjs';
import {DataPair} from './data-pair';

@Component({
  selector: 'app-autocomplete-select',
  templateUrl: './autocomplete-select.component.html',
  styleUrls: ['./autocomplete-select.component.css']
})
export class AutocompleteSelectComponent {
  public searchControl: FormControl<string | null> = new FormControl(null);

  @Input()
  public label: string = "";

  @Input()
  public values: DataPair[] = [];

  public filteredValues: Observable<DataPair[]> = this.searchControl.valueChanges.pipe(
    startWith(''),
    map(filterValue => {
      if (!filterValue) {
        return this.values;
      }

      if (!filterValue.toLowerCase) {
        return this.values;
      }

      return this.values.filter(value => value.displayName.toLowerCase().includes(filterValue.toLowerCase()));
    })
  );

  @Input()
  public control: FormControl<DataPair | null> = new FormControl(null);

  public selectOption(event: MatAutocompleteSelectedEvent) {
    this.control.setValue(event.option.value);
    this.searchControl.setValue(null);
  }

  public deselectOption() {
    this.control.setValue(null);
  }
}
