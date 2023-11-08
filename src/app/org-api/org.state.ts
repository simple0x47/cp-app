import { Membership } from './membership';
import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ReadAllMemberships } from './org.actions';

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
export class OrgState {
  @Action(ReadAllMemberships)
  readAllMemberships(
    ctx: StateContext<OrgStateModel>,
    action: ReadAllMemberships,
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
