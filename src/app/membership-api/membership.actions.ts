import { Membership } from './membership';

export class ReadAllMembershipsSuccess {
  static readonly type = '[Org] Read all memberships success';

  constructor(public memberships: Membership[]) {}
}
