import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrgSelectorDialogComponent } from '../org-selector-dialog/org-selector-dialog.component';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-org-selector',
  templateUrl: './org-selector.component.html',
  styleUrls: ['./org-selector.component.css'],
})
export class OrgSelectorComponent {
  private isSelectorDisplayed: boolean = false;

  public constructor(private _dialog: MatDialog) {}

  public onSelectOrgClick() {
    if (this.isSelectorDisplayed) {
      return;
    }

    this.isSelectorDisplayed = true;
    let dialog = this._dialog.open(OrgSelectorDialogComponent, {
      backdropClass: 'custom-dialog',
      position: {
        right: '16px',
        top: '80px',
      },
      minWidth: '244px',
      width: '460px',
      maxWidth: '460px',
    });

    dialog
      .afterClosed()
      .pipe(
        first(),
        map((_) => {
          this.isSelectorDisplayed = false;
        }),
      )
      .subscribe();

    dialog
      .backdropClick()
      .pipe(
        first(),
        map((_) => {
          dialog.close();
        }),
      )
      .subscribe();
  }
}
