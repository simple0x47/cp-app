import { RegisterUserPayload } from './register-user-payload';
import { RegisterOrgPayload } from './register-org-payload';

export interface RegisterCreatingOrgPayload {
  User: RegisterUserPayload;
  Org: RegisterOrgPayload;
}
