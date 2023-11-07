import { Component } from '@angular/core';

@Component({
  selector: 'app-org-selector-dialog',
  templateUrl: './org-selector-dialog.component.html',
  styleUrls: ['./org-selector-dialog.component.scss'],
})
export class OrgSelectorDialogComponent {
  public isShowMoreOrganizationsOpened: boolean = false;
}
