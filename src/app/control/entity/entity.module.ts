import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddNewEntityComponent} from "./entity-selector/entity-selector-dialog/add-new-entity/add-new-entity.component";
import {EntitySelectorComponent} from "./entity-selector/entity-selector.component";
import {EntitySelectorDialogComponent} from "./entity-selector/entity-selector-dialog/entity-selector-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ControlModule} from "../control.module";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    AddNewEntityComponent,
    EntitySelectorComponent,
    EntitySelectorDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    ControlModule,
    CommonModule
  ],
  exports: [
    AddNewEntityComponent,
    EntitySelectorComponent
  ]
})
export class EntityModule {
}
