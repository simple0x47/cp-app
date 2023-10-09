import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteSelectComponent } from "./autocomplete-select/autocomplete-select.component";
import {
  CurrencySelectorBottomSheetComponent
} from "./currency-selector-bottom-sheet/currency-selector-bottom-sheet.component";
import { ImagesUploaderComponent } from "./images-uploader/images-uploader.component";
import { MapAreaSelectorComponent } from "./map-area-selector/map-area-selector.component";
import { PriceComponent } from "./price/price.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { GoogleMapsModule } from "@angular/google-maps";
import { MatDialogModule } from "@angular/material/dialog";
import { MatOptionModule } from "@angular/material/core";
import { ConfirmDialogComponent } from "./map-area-selector/confirm-dialog/confirm-dialog.component";


@NgModule({
  declarations: [
    AutocompleteSelectComponent,
    CurrencySelectorBottomSheetComponent,
    ImagesUploaderComponent,
    MapAreaSelectorComponent,
    ConfirmDialogComponent,
    PriceComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatOptionModule,
    ReactiveFormsModule,
    CommonModule,
    GoogleMapsModule
  ],
  exports: [
    AutocompleteSelectComponent,
    CurrencySelectorBottomSheetComponent,
    ImagesUploaderComponent,
    MapAreaSelectorComponent,
    ConfirmDialogComponent,
    PriceComponent
  ]
})
export class ControlModule {
}
