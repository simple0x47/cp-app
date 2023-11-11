import { Membership } from './membership';

export class ReadAllMembershipsSuccess {
  static readonly type = '[Membership] Read all memberships success';

  constructor(public memberships: Membership[]) {}
}

export class SetActiveMembership {
  static readonly type = '[Membership] Set active membership'

  constructor(public membership: Membership) {}
}
