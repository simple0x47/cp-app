import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from 'src/app/auth-api/auth.state';
import { MembershipApiModule } from '../membership-api/membership-api.module';
import { TokenInterceptor } from './token-interceptor';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    NgxsModule.forFeature([AuthState]),
    MembershipApiModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthApiModule {}
