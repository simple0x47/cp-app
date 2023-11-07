import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteSelectComponent } from './autocomplete-select/autocomplete-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { InitialsAvatarComponent } from './initials-avatar/initials-avatar.component';

@NgModule({
  declarations: [AutocompleteSelectComponent, InitialsAvatarComponent],
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
    GoogleMapsModule,
  ],
  exports: [AutocompleteSelectComponent, InitialsAvatarComponent],
})
export class ControlModule {}
