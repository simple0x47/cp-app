import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {InitializationData} from './initialization-data';
import {SelectCategoryEvent} from '../../category-select/select-category-event';

@Component({
  selector: 'app-category-set-selector-dialog',
  templateUrl: './category-set-selector-dialog.component.html',
  styleUrls: ['./category-set-selector-dialog.component.css']
})
export class CategorySetSelectorDialogComponent {
  public constructor(
    private _dialogRef: MatDialogRef<CategorySetSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public initializationData: InitializationData
  ) {

  }

  public selectedCategory(event: SelectCategoryEvent) {
    this._dialogRef.close(event.target);
  }
}
