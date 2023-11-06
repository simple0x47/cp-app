import { Address } from '../core/address';

export interface RegisterOrgPayload {
  Name: string;
  Address: Address;
  Permissions: string[];
}
