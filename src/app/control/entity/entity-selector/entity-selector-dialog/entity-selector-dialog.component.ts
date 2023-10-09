import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {first} from 'rxjs';
import {Entity} from "../../../../api/entity-api/entity";
import {AddNewEntityComponent} from "./add-new-entity/add-new-entity.component";

@Component({
  selector: 'app-entity-selector-dialog',
  templateUrl: './entity-selector-dialog.component.html',
  styleUrls: ['./entity-selector-dialog.component.css']
})
export class EntitySelectorDialogComponent implements AfterViewInit {
  public displayedColumns: string[] = [];
  public dataColumns: string[] = [];
  @ViewChild(MatPaginator)
  public paginator: MatPaginator | null = null;
  @ViewChild(MatSort)
  public sort: MatSort | null = null;
  @Input()
  public entityName: string = "";

  public constructor(
    private _dialog: MatDialog,
    private _currentDialog: MatDialogRef<EntitySelectorDialogComponent>
  ) {

  }

  private _dataSource: MatTableDataSource<Entity> | null = null;

  public get dataSource(): MatTableDataSource<Entity> | null {
    return this._dataSource;
  }

  public set dataSource(value: MatTableDataSource<Entity> | null) {
    this._dataSource = value;

    if (this._dataSource === null) {
      return;
    }

    this._dataSource.paginator = this.paginator;
    this._dataSource.sort = this.sort;

    this._dataSource.filterPredicate = (data, filter) => {
      for (const key of Object.keys(data)) {
        const stringValue: string = data[key];

        if (stringValue.toLowerCase().includes(filter)) {
          return true;
        }
      }

      return false;
    };

    if (this._dataSource.data.length <= 0) {
      return;
    }

    const firstEntity = this._dataSource.data.at(0);

    if (!firstEntity) {
      return;
    }

    for (const key of Object.keys(firstEntity)) {
      this.displayedColumns.push(key);
      this.dataColumns.push(key);
    }

    // Show the select button.
    this.displayedColumns.push("select");
  }

  public ngAfterViewInit(): void {
    if (this._dataSource === null) {
      return;
    }

    this._dataSource.paginator = this.paginator;
    this._dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    if (this._dataSource === null) {
      return;
    }

    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSource.filter = filterValue.trim().toLowerCase();

    if (this._dataSource.paginator) {
      this._dataSource.paginator.firstPage();
    }
  }

  public addNewEntity() {
    const dialogRef = this._dialog.open(AddNewEntityComponent);
    dialogRef.componentInstance.entityName = this.entityName;

    dialogRef.afterClosed().pipe(first()).subscribe(value => {
      if (!value) {
        return;
      }

      this._currentDialog.close(value);
    });
  }
}
