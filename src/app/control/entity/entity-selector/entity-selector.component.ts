import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {EntitySelectorDialogComponent} from './entity-selector-dialog/entity-selector-dialog.component';
import {Observable} from 'rxjs';
import {Entity} from "../../../api/entity-api/entity";

@Component({
  selector: 'app-entity-selector',
  templateUrl: './entity-selector.component.html',
  styleUrls: ['./entity-selector.component.css']
})
export class EntitySelectorComponent implements AfterViewInit {
  @Input()
  public entityId: string = "";

  @Input()
  public entityName: string = "";

  @Input()
  public entities$: Observable<Entity[]> | null = null;

  @Output()
  public entitySelect: EventEmitter<any> = new EventEmitter();

  public entityControl: FormControl<string | null> = new FormControl(null);
  public entityInvisibleControl: FormControl<Entity | null> = new FormControl(null);

  public constructor(
    private _dialog: MatDialog
  ) {

  }

  public openDialog() {
    const dialogRef = this._dialog.open(EntitySelectorDialogComponent);

    this.entities$?.subscribe(entities => {
      const dataSource = new MatTableDataSource<Entity>(entities);
      dialogRef.componentInstance.entityName = this.entityName;
      dialogRef.componentInstance.dataSource = dataSource;
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      // Entities must have the "name" key in order to be able to fill the visible form control.
      this.entityControl.setValue(result["name"]);
      this.entityInvisibleControl.setValue(result);
      this.entitySelect.emit(result);
    });
  }

  public ngAfterViewInit(): void {

  }

  public clear() {
    this.entityControl.setValue(null);
  }

  public isClearButtonVisible(): boolean {
    if (!this.entityInvisibleControl.value) {
      return false;
    }

    return true;
  }
}
