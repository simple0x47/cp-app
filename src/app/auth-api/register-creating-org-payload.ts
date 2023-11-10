import { RegisterUserPayload } from './register-user-payload';
import { CreateOrgPayload } from './create-org-payload';

export interface RegisterCreatingOrgPayload {
  User: RegisterUserPayload;
  Org: CreateOrgPayload;
}
