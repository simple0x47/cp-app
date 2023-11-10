import { Component } from '@angular/core';
import { MembershipService } from '../../membership-api/membership.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public constructor(
    private _membershipService: MembershipService,
    private _store: Store,
  ) {}

  public onEventClick() {
    const userId = this._store.selectSnapshot((state) => state.auth.UserId);
    this._membershipService.readAllMemberships(userId).subscribe();
  }
}
