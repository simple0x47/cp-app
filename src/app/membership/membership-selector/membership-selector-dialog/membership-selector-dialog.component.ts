import { Component, OnDestroy, OnInit } from '@angular/core';
import { Membership } from '../../../membership-api/membership';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-membership-selector-dialog',
  templateUrl: './membership-selector-dialog.component.html',
  styleUrls: ['./membership-selector-dialog.component.scss'],
})
export class MembershipSelectorDialogComponent implements OnInit, OnDestroy {
  public isShowMoreOrganizationsOpened: boolean = false;

  public activeMembership: Membership | null = null;
  private _membershipSubscription: Subscription | null = null;

  public constructor(private _store: Store) {}

  public ngOnInit() {
    this._membershipSubscription = this._store
      .select((state) => state.membership)
      .pipe(
        map((v) => {
          this.activeMembership = v.ActiveMembership;
        }),
      )
      .subscribe();
  }

  public ngOnDestroy() {
    if (this._membershipSubscription != null) {
      this._membershipSubscription.unsubscribe();
    }
  }
}
