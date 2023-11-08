import { Component } from '@angular/core';

@Component({
  selector: 'app-membership-selector-dialog',
  templateUrl: './membership-selector-dialog.component.html',
  styleUrls: ['./membership-selector-dialog.component.scss'],
})
export class MembershipSelectorDialogComponent {
  public isShowMoreOrganizationsOpened: boolean = false;
}
