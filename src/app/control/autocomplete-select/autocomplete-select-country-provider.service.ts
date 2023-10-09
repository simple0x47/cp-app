import { Injectable } from '@angular/core';
import { DataPair } from './data-pair';
import { ControlModule } from "../control.module";
import { getData } from 'country-list';

@Injectable({
  providedIn: ControlModule
})
export class AutocompleteSelectCountryProviderService {

  constructor() {
  }

  public getCountryList(locale: string): DataPair[] {
    let countryList: DataPair[] = getData().map((country) => {
      return new DataPair(country.name, country.code);
    });

    return countryList;
  }
}
