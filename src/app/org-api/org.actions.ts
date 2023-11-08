import { Membership } from './membership';

export class ReadAllMemberships {
  static readonly type = '[Org] Read all memberships';

  constructor(public memberships: Membership[]) {}
}
