import {Injectable} from '@angular/core';
import {DataPair} from './data-pair';
import {Country, getCountryDisplayNameByCountryCode} from "../../util/country";
import {ControlModule} from "../control.module";

@Injectable({
  providedIn: ControlModule
})
export class AutocompleteSelectCountryProviderService {

  constructor() {
  }

  public getCountryList(locale: string): DataPair[] {
    const countryCodes = this.getCountryCodes();

    let countryList: DataPair[] = countryCodes.map((countryCode) => {
      return new DataPair(getCountryDisplayNameByCountryCode(locale, countryCode), countryCode);
    });

    return countryList;
  }

  private getCountryCodes(): string[] {
    return Object.values(Country);
  }
}
