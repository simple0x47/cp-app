import { Injectable } from '@angular/core';
import { CreateOrgPayload } from '../auth-api/create-org-payload';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const CREATE_ORG_ENDPOINT: string = '/api/Organization';
const JOIN_ORG_ENDPOINT: string = '/api/Organization/join';

@Injectable({
  providedIn: 'root',
})
export class OrgService {
  constructor(
    private _store: Store,
    private _client: HttpClient,
  ) {}

  public createOrg(payload: CreateOrgPayload): Observable<null> {
    return new Observable<null>((observer) => {
      let endpointSubscription = this._client
        .post(
          environment.apiUrl + CREATE_ORG_ENDPOINT,
          JSON.stringify(payload),
          {
            headers: {
              'content-type': 'application/json',
            },
            observe: 'response',
          },
        )
        .subscribe({
          next: (response) => {
            if (response.status != HttpStatusCode.Ok) {
              observer.error(
                $localize`An error occurred creating the organization.`,
              );
              return;
            }

            observer.next(null);
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

  public joinOrg(invitationCode: string): Observable<null> {
    return new Observable((observer) => {
      let endpointSubscription = this._client.post(
        environment.apiUrl + JOIN_ORG_ENDPOINT,
        {
          InvitationCode: invitationCode,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
          observe: 'response',
        },
      );

      return {
        unsubscribe() {},
      };
    });
  }
}
