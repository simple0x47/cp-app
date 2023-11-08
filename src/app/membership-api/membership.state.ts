import { Membership } from './membership';
import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ReadAllMembershipsSuccess } from './membership.actions';

export interface OrgStateModel {
  ActiveMembership: Membership | null;
  Memberships: Membership[];
}

@State<OrgStateModel>({
  name: 'org',
  defaults: {
    ActiveMembership: null,
    Memberships: [],
  },
})
@Injectable()
export class MembershipState {
  @Action(ReadAllMembershipsSuccess)
  readAllMemberships(
    ctx: StateContext<OrgStateModel>,
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
}
