import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Membership } from './membership';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WrappedResult } from '../core/wrapped-result';
import { Store } from '@ngxs/store';
import { ReadAllMembershipsSuccess } from './membership.actions';
import { MembershipApiModule } from './membership-api.module';
import { UserCreateOrgPayload } from './user-create-org-payload';

const READ_ALL_MEMBERSHIPS_ENDPOINT: string = '/api/Membership/user';
const USER_CREATE_ORG_ENDPOINT: string = '/api/Membership/user-create-org';

@Injectable({
  providedIn: MembershipApiModule,
})
export class MembershipService {
  constructor(
    private _client: HttpClient,
    private _store: Store,
  ) {}

  public userCreateOrg(payload: UserCreateOrgPayload): Observable<string> {
    return new Observable<string>((observer) => {
      let endpointSubscription = this._client
        .post(
          environment.apiUrl + USER_CREATE_ORG_ENDPOINT,
          JSON.stringify(payload),
          {
            headers: {
              'content-type': 'application/json',
            },
            observe: 'response',
          },
        )
        .subscribe({
          next: (v) => {
            const membershipId = v.body;

            observer.next(membershipId as string);
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          },
        });

      return {
        unsubscribe() {
          endpointSubscription.unsubscribe();
        },
      };
    });
  }

  public readAllMemberships(userId: string): Observable<Membership[]> {
    return new Observable<Membership[]>((observer) => {
      let endpointSubscription = this._client
        .get(
          environment.apiUrl + READ_ALL_MEMBERSHIPS_ENDPOINT + '/' + userId,
          {
            observe: 'response',
          },
        )
        .subscribe({
          next: (response) => {
            let result = response.body as WrappedResult<Membership[]>;

            this._store.dispatch(new ReadAllMembershipsSuccess(result.Result));
            observer.next(result.Result);
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          },
        });

      return {
        unsubscribe() {
          endpointSubscription.unsubscribe();
        },
      };
    });
  }
}
