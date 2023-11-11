import { Membership } from './membership';
import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {ReadAllMembershipsSuccess, SetActiveMembership} from './membership.actions';

export interface MembershipStateModel {
  ActiveMembership: Membership | null;
  Memberships: Membership[];
}

@State<MembershipStateModel>({
  name: 'membership',
  defaults: {
    ActiveMembership: null,
    Memberships: [],
  },
})
@Injectable()
export class MembershipState {
  @Action(ReadAllMembershipsSuccess)
  readAllMemberships(
    ctx: StateContext<MembershipStateModel>,
    action: ReadAllMembershipsSuccess,
  ) {
    let activeMembership: Membership | null = ctx.getState().ActiveMembership;

    if (activeMembership == null && action.memberships.length > 0) {
      activeMembership = action.memberships[0];
    }

    ctx.setState({
      ActiveMembership: activeMembership,
      Memberships: action.memberships,
    });
  }

  @Action(SetActiveMembership)
  setActiveMembership(ctx: StateContext<MembershipStateModel>, action: SetActiveMembership) {
    ctx.patchState(
      {
        ActiveMembership: action.membership
      }
    );
  }
}
