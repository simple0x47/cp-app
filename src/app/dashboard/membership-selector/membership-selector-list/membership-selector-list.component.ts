import { Component, OnDestroy, OnInit } from '@angular/core';
import { Membership } from '../../../membership-api/membership';
import { Store } from '@ngxs/store';
import { map, Subscription } from 'rxjs';
import {MembershipService} from "../../../membership-api/membership.service";
import {SetActiveMembership} from "../../../membership-api/membership.actions";

@Component({
  selector: 'app-membership-selector-list',
  templateUrl: './membership-selector-list.component.html',
  styleUrls: ['./membership-selector-list.component.scss'],
})
export class MembershipSelectorListComponent implements OnInit, OnDestroy {
  public memberships: Membership[] = [];

  private _membershipsSubscription: Subscription | null = null;

  public constructor(private _store: Store) {}

  public ngOnInit() {
    this._membershipsSubscription = this._store
      .select((state) => state.membership.Memberships)
      .pipe(
        map((v: Membership[]) => {
          let activeMembership: Membership = this._store.selectSnapshot(
            (state) => state.membership.ActiveMembership,
          );

          let memberships: Membership[] = [];

          for (let membership of v) {
            if (activeMembership.OrgId != membership.OrgId) {
              memberships.push(membership);
            }
          }

          this.memberships = memberships;
        }),
      )
      .subscribe();
  }

  public ngOnDestroy() {
    if (this._membershipsSubscription != null) {
      this._membershipsSubscription.unsubscribe();
    }
  }

  public onSelectMembership(membership: Membership) {
    this._store.dispatch(new SetActiveMembership(membership)).subscribe();
  }
}
