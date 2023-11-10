import { Address } from '../core/address';

export interface CreateOrgPayload {
  Name: string;
  Address: Address;
  Permissions: string[];
}
