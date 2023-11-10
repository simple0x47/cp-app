import { CreateOrgPayload } from '../auth-api/create-org-payload';

export interface UserCreateOrgPayload {
  UserId: string;
  Org: CreateOrgPayload;
}
