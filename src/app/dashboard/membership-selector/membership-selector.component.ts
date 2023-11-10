import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MembershipSelectorDialogComponent } from './membership-selector-dialog/membership-selector-dialog.component';
import { first, map, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { Membership } from '../../membership-api/membership';
import { RoutingService } from '../../routing/routing.service';

@Component({
  selector: 'app-membership-selector',
  templateUrl: './membership-selector.component.html',
  styleUrls: ['./membership-selector.component.css'],
})
export class MembershipSelectorComponent implements OnInit, OnDestroy {
  public activeMembership: Membership | null = null;

  private _membershipsSubscription: Subscription | null = null;

  private isSelectorDisplayed: boolean = false;

  public constructor(
    private _dialog: MatDialog,
    private _store: Store,
    private _routingService: RoutingService,
  ) {}

  public ngOnInit() {
    this._membershipsSubscription = this._store
      .select((state) => state.org.ActiveMembership)
      .pipe(
        map((v, i) => {
          this.activeMembership = v;
        }),
      )
      .subscribe();
  }

  public ngOnDestroy() {
    if (this._membershipsSubscription != null) {
      this._membershipsSubscription.unsubscribe();
    }
  }

  public onSelectMembershipClick() {
    if (this.activeMembership == null) {
      this._routingService.goToNewMembership();
      return;
    }

    if (this.isSelectorDisplayed) {
      return;
    }

    this.isSelectorDisplayed = true;
    let dialog = this._dialog.open(MembershipSelectorDialogComponent, {
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
